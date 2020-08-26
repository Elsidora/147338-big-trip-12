import TripInfoView from "./view/trip-info";
import TripRouteView from "./view/trip-route";
import TripCostView from "./view/trip-cost";

import SiteMenuView from "./view/site-menu";
import FilterTitleView from "./view/filter-title";
import FilterView from "./view/filter";

import NoPointsView from "./view/no-points";

import SortingView from "./view/sorting";
import TripDaysListView from "./view/trip-days-list";
import TripDaysItemView from "./view/trip-days-item";
import TripDayInfoView from "./view/trip-day-info";
import TripPointsListView from "./view/trip-points-list";

import PointView from "./view/point";
import PointEditView from "./view/point-edit";

import {renderElement, RenderPosition, getPointsByDays, closeElement, getDateOfForm} from "./util";
import {generatePointsArray} from "./mock/point";
import {generateFilter} from "./mock/filter";

const POINT_COUNT = 20;

const points = generatePointsArray(POINT_COUNT);
const filters = generateFilter(points);
const groupedPoints = getPointsByDays(points);

const pageBodyElement = document.querySelector(`.page-body`);
const headerElement = pageBodyElement.querySelector(`.page-header`);
const mainElement = pageBodyElement.querySelector(`.page-main`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

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

  const closeFormEditPoint = () => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscapePress);
  };

  const onEscapePress = (evt) => {
    closeElement.isEscapeEvent(evt, closeFormEditPoint);
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    getDateOfForm();
    document.addEventListener(`keydown`, onEscapePress);
  });

  pointEditComponent.setPointClickHandler(() => {
    closeFormEditPoint();
  });

  pointEditComponent.setFormSubmitHandler(() => {
    closeFormEditPoint();
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
  if (!points.length) {
    const noPointsComponent = new NoPointsView();

    renderElement(tripEventsElement, noPointsComponent.getElement(), RenderPosition.BEFOREEND);
    return;
  }
  const sortingComponent = new SortingView();
  const tripDaysListComponent = new TripDaysListView();

  renderElement(tripEventsElement, sortingComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(tripEventsElement, tripDaysListComponent.getElement(), RenderPosition.BEFOREEND);
  Object.keys(groupedPoints).map((day, index) => renderDays(groupedPoints[day].points, tripDaysListComponent, groupedPoints[day].points[0].dateFrom, index + 1));
};

renderInfo(tripMainElement);
renderControls(tripControlsElement);
renderMain();
