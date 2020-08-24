import flatpickr from "flatpickr";

import TripInfoView from "./view/trip-info";
import TripRouteView from "./view/trip-route";
import TripCostView from "./view/trip-cost";

import SiteMenuView from "./view/site-menu";
import FilterTitleView from "./view/filter-title";
import FilterView from "./view/filter";

import SortingView from "./view/sorting";
import TripDaysListView from "./view/trip-days-list";
import TripDaysItemView from "./view/trip-days-item";
import TripDayInfoView from "./view/trip-day-info";
import TripPointsListView from "./view/trip-points-list";

import PointView from "./view/point";
import PointEditView from "./view/point-edit";

import {renderHtmlElement, renderElement, RenderPosition, getPointsByDays} from "./util";
import {generatePointsArray} from "./mock/point";
import {generateFilter} from "./mock/filter";

const POINT_COUNT = 20;

const points = generatePointsArray(POINT_COUNT);
const filters = generateFilter(points);
const groupedPoints = getPointsByDays(points);

console.log(groupedPoints);

const pageBodyElement = document.querySelector(`.page-body`);
const headerElement = pageBodyElement.querySelector(`.page-header`);
const mainElement = pageBodyElement.querySelector(`.page-main`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

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

const renderPoint = (pointContainer, point) => {

  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const replacePointToForm = () => {
    pointContainer.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    pointContainer.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToForm();
  });

  pointEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceFormToPoint();
  });

  pointEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  renderElement(pointContainer, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderDays = (pointsArr, daysListContainer, objectDate, index) => {
  const tripDaysItemComponent = new TripDaysItemView();
  const tripDayInfoComponent = new TripDayInfoView(objectDate, index);
  const tripPointsListComponent = new TripPointsListView();

  renderElement(daysListContainer.getElement(), tripDaysItemComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(tripDaysItemComponent.getElement(), tripDayInfoComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(tripDaysItemComponent.getElement(), tripPointsListComponent.getElement(), RenderPosition.BEFOREEND);
  pointsArr.map((point) => renderPoint(tripPointsListComponent.getElement(), point));
};

const renderMain = () => {
  const sortingComponent = new SortingView();
  const tripDaysListComponent = new TripDaysListView();

  renderElement(tripEventsElement, sortingComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(tripEventsElement, tripDaysListComponent.getElement(), RenderPosition.BEFOREEND);
  Object.keys(groupedPoints).map((day, index) => renderDays(groupedPoints[day].points, tripDaysListComponent, groupedPoints[day].points[0].dateFrom, index + 1));

  console.log(Object.keys(groupedPoints));
};

renderInfo(tripMainElement);
renderControls(tripControlsElement);
renderMain();
// const startDateEventField = flatpickr(`#event-start-time-1`, flatpickrOptions);
// const endDateEventField = flatpickr(`#event-end-time-1`, flatpickrOptions);
