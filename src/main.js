import TripInfoView from "./view/trip-info";
import TripRouteView from "./view/trip-route";
import TripCostView from "./view/trip-cost";

import SiteMenuView from "./view/site-menu";
import StatisticsView from "./view/statistics";
import FilterView from "./view/filter";

import {renderElement, remove, RenderPosition} from "./utils/render";

import {generatePointsArray} from "./mock/point";

import EventsPresenter from "./presenter/events";
import FilterPresenter from "./presenter/filter";
import PointsModel from "./model/points";
import FilterModel from "./model/filter";
import {MenuItem, UpdateType, FilterType} from "./const";
import Api from "./api";

const POINT_COUNT = 15;
const AUTHORIZATION = `Basic hS2sd3dfSwcl1sa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const points = generatePointsArray(POINT_COUNT);

const api = new Api(END_POINT, AUTHORIZATION);

api.getPoints().then((points) => {
  console.log(points);
  // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
  // а ещё на сервере используется snake_case, а у нас camelCase.
  // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
  // Есть вариант получше - паттерн "Адаптер"
});

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const pageBodyElement = document.querySelector(`.page-body`);
const headerElement = pageBodyElement.querySelector(`.page-header`);
const mainElement = pageBodyElement.querySelector(`.page-main`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

const eventsPresenter = new EventsPresenter(tripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, pointsModel);
const statsContainer = mainElement.querySelector(`.page-body__container`);

let statsComponent = null;

const renderInfo = (renderInfoContainer) => {

  const tripInfoComponent = new TripInfoView();
  const tripCostComponent = new TripCostView(points);

  if (!points.length) {
    renderElement(renderInfoContainer, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
    renderElement(tripInfoComponent.getElement(), tripCostComponent.getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const tripStartDate = points[0].dateFrom;
  const tripEndDate = points[points.length - 1].dateTo;
  const tripRouteComponent = new TripRouteView(tripStartDate, tripEndDate);

  renderElement(renderInfoContainer, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
  renderElement(tripInfoComponent.getElement(), tripRouteComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(tripInfoComponent.getElement(), tripCostComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderControls = (renderControlsContainer) => {
  const siteMenuComponent = new SiteMenuView();
  const filterComponent = new FilterView();

  renderElement(renderControlsContainer, siteMenuComponent.getElement(), RenderPosition.BEFOREEND);
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

renderInfo(tripMainElement);
renderControls(tripControlsElement);
filterPresenter.init();
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
