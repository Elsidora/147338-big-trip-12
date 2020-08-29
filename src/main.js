import TripInfoView from "./view/trip-info";
import TripRouteView from "./view/trip-route";
import TripCostView from "./view/trip-cost";

import SiteMenuView from "./view/site-menu";
import FilterView from "./view/filter";

import {renderElement, RenderPosition} from "./utils/render";

import {generatePointsArray} from "./mock/point";
import {generateFilter} from "./mock/filter";

import EventsPresenter from "./presenter/events";

const POINT_COUNT = 20;

const points = generatePointsArray(POINT_COUNT);
const filters = generateFilter(points);


const pageBodyElement = document.querySelector(`.page-body`);
const headerElement = pageBodyElement.querySelector(`.page-header`);
const mainElement = pageBodyElement.querySelector(`.page-main`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

const eventsPresenter = new EventsPresenter(tripEventsElement);

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
  const filterComponent = new FilterView(filters);

  renderElement(renderControlsContainer, siteMenuComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(renderControlsContainer, filterComponent.getTitleFilterElement(), RenderPosition.BEFOREEND);
  renderElement(renderControlsContainer, filterComponent.getElement(), RenderPosition.BEFOREEND);
};

renderInfo(tripMainElement);
renderControls(tripControlsElement);
eventsPresenter.init(points);
