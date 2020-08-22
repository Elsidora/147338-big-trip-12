import flatpickr from "flatpickr";

import TripInfoView from "./view/trip-info";
import TripRouteView from "./view/trip-route";
import TripCostView from "./view/trip-cost";

import SiteMenuView from "./view/site-menu";
import FilterTitleView from "./view/filter-title";
import FilterView from "./view/filter";

import SortingView from "./view/sorting";
import {createTripDaysTemplate} from "./view/point-list";
import {createPointTemplate} from "./view/point";
import {createFormEditTemplate} from "./view/point-edit";

import {renderHtmlElement, renderElement, RenderPosition} from "./util";
import {generatePointsArray} from "./mock/point";
import {generateFilter} from "./mock/filter";

const POINT_COUNT = 8;

const points = generatePointsArray(POINT_COUNT);
const filters = generateFilter(points);

const pageBodyElement = document.querySelector(`.page-body`);
const headerElement = pageBodyElement.querySelector(`.page-header`);
const mainElement = pageBodyElement.querySelector(`.page-main`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

const renderTripEventsList = () => {
  const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);
  for (let i = 1; i < POINT_COUNT; i += 1) {
    renderHtmlElement(tripEventsListElement, createPointTemplate(points[i]), `beforeend`);
  }
};

const renderInfo = (renderInfoContainer) => {
  const tripStartDate = points[0].dateFrom;
  const tripEndDate = points[points.length - 1].dateTo;
  const tripInfoComponent = new TripInfoView();
  const tripRouteComponent = new TripRouteView(tripStartDate, tripEndDate);
  const tripCostComponent = new TripCostView();

  renderElement(renderInfoContainer, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
  renderElement(tripInfoComponent.getElement(), tripRouteComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(tripInfoComponent.getElement(), tripCostComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderControls = (renderControlsContainer) => {
  const siteMenuComponent = new SiteMenuView();
  const filterTitleComponent = new FilterTitleView();
  const filterComponent = new FilterView(filters);

  renderElement(renderControlsContainer, siteMenuComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(renderControlsContainer, filterTitleComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(renderControlsContainer, filterComponent.getElement(), RenderPosition.BEFOREEND);
};

renderInfo(tripMainElement);
renderControls(tripControlsElement);


renderElement(tripEventsElement, new SortingView().getElement(), RenderPosition.BEFOREEND);
renderHtmlElement(tripEventsElement, createFormEditTemplate(points[0]), `beforeend`);
renderHtmlElement(tripEventsElement, createTripDaysTemplate(points), `beforeend`);
renderTripEventsList();

const flatpickrOptions = {
  enableTime: true,
  // eslint-disable-next-line camelcase
  time_24hr: true,
  altInput: true,
  altFormat: `d/m/y H:i`,
  dateFormat: `d/m/y H:i`,
  minDate: `today`,
  onReady(selectedDates, dateStr, instance) {
    instance._input.placeholder = instance.formatDate(new Date(), `d/m/y H:i`);
  },
};

const startDateEventField = flatpickr(`#event-start-time-1`, flatpickrOptions);
const endDateEventField = flatpickr(`#event-end-time-1`, flatpickrOptions);
