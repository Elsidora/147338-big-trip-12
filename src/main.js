import TripInfoView from "./view/trip-info";
import TripRouteView from "./view/trip-route";
import TripCostView from "./view/trip-cost";

import SiteMenuView from "./view/site-menu";
import StatisticsView from "./view/statistics";
import FilterView from "./view/filter";

import {renderElement, remove, RenderPosition} from "./utils/render";

// import {generatePointsArray} from "./mock/point";

import EventsPresenter from "./presenter/events";
import FilterPresenter from "./presenter/filter";
import PointsModel from "./model/points";
import FilterModel from "./model/filter";
import OffersModel from "./model/offers";
import DestinationModel from "./model/destination";
import {MenuItem, UpdateType, FilterType} from "./const";
import Api from "./api";

// const POINT_COUNT = 15;
const AUTHORIZATION = `Basic hS2sd3dfSwcl1sa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

// const points = generatePointsArray(POINT_COUNT);

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();

const filterModel = new FilterModel();

const offersModel = new OffersModel();
const destinationModel = new DestinationModel();

const pageBodyElement = document.querySelector(`.page-body`);
const headerElement = pageBodyElement.querySelector(`.page-header`);
const mainElement = pageBodyElement.querySelector(`.page-main`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

const eventsPresenter = new EventsPresenter(tripEventsElement, pointsModel, filterModel, offersModel, destinationModel, api);
const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, pointsModel);
const statsContainer = mainElement.querySelector(`.page-body__container`);

let statsComponent = null;

const renderInfo = (renderInfoContainer, responsePoints) => {

  const tripInfoComponent = new TripInfoView();
  const tripCostComponent = new TripCostView(responsePoints);

  if (!responsePoints.length) {
    renderElement(renderInfoContainer, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
    renderElement(tripInfoComponent.getElement(), tripCostComponent.getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const tripStartDate = responsePoints[0].dateFrom;
  const tripEndDate = responsePoints[responsePoints.length - 1].dateTo;
  const tripRouteComponent = new TripRouteView(tripStartDate, tripEndDate);

  renderElement(renderInfoContainer, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
  renderElement(tripInfoComponent.getElement(), tripRouteComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(tripInfoComponent.getElement(), tripCostComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderControls = (renderControlsContainer) => {
  const siteMenuComponent = new SiteMenuView();
  const filterComponent = new FilterView();

  renderElement(renderControlsContainer, siteMenuComponent.getElement(), RenderPosition.AFTERBEGIN);
  renderElement(renderControlsContainer, filterComponent.getTitleFilterElement(), RenderPosition.BEFOREEND);

  const handleSiteMenuClick = (menuItem) => {
    switch (menuItem) {
      case MenuItem.TABLE:
        eventsPresenter.init();
        remove(statsComponent);
        break;
      case MenuItem.STATS:
        eventsPresenter.destroy();
        statsComponent = new StatisticsView(pointsModel.getPoints());
        renderElement(statsContainer, statsComponent, RenderPosition.BEFOREEND);
        break;
    }
  };

  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
};

api.getData()
  .then((data) => {
    pointsModel.setPoints(UpdateType.INIT, data.points);
    offersModel.setOffers(UpdateType.INIT, data.offers);
    destinationModel.setDestination(UpdateType.INIT, data.destinations);
    renderInfo(tripMainElement, data.points);
    renderControls(tripControlsElement);
  });
eventsPresenter.init();


const handlePointNewFormClose = () => {
  document.querySelector(`.trip-main__event-add-btn`).disabled = false;
};

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();

  eventsPresenter.destroy();
  remove(statsComponent);
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

  eventsPresenter.init();
  eventsPresenter.createPoint(handlePointNewFormClose);
  document.querySelector(`.trip-main__event-add-btn`).disabled = true;
});


