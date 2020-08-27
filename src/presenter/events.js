import NoPointsView from "../view/no-points";

import SortingView from "../view/sorting";
import TripDaysListView from "../view/trip-days-list";
import TripDaysItemView from "../view/trip-days-item";
import TripDayInfoView from "../view/trip-day-info";
import TripPointsListView from "../view/trip-points-list";

import PointView from "../view/point";
import PointEditView from "../view/point-edit";

import {renderElement, RenderPosition, replace} from "../utils/render";
import {closeElement} from "../utils/helper";
import {getDateOfForm, getPointsByDays} from "../utils/point";

export default class Events {
  constructor(eventsContainer) {
    this._eventsContainer = eventsContainer;
    this._sortingComponent = new SortingView();
    this._tripDaysListComponent = new TripDaysListView();
    this._noPointsComponent = new NoPointsView();
  }

  init(eventsPoints) {
    this._eventsPoints = eventsPoints.slice();

    this._renderEvents();
  }

  _renderSort() {
    renderElement(this._eventsContainer, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  _renderDaysList() {
    renderElement(this._eventsContainer, this._tripDaysListComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(pointContainer, point) {
    const pointComponent = new PointView(point);
    const pointEditComponent = new PointEditView(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
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

    renderElement(pointContainer, pointComponent, RenderPosition.BEFOREEND);
  }

  _renderDays(pointsArr, objectDate, index) {
    const tripDaysItemComponent = new TripDaysItemView();
    const tripDayInfoComponent = new TripDayInfoView(objectDate, index);
    const tripPointsListComponent = new TripPointsListView();

    renderElement(this._tripDaysListComponent, tripDaysItemComponent, RenderPosition.BEFOREEND);
    renderElement(tripDaysItemComponent, tripDayInfoComponent, RenderPosition.BEFOREEND);
    renderElement(tripDaysItemComponent, tripPointsListComponent, RenderPosition.BEFOREEND);
    pointsArr.map((point) => this._renderPoint(tripPointsListComponent, point));
  }

  _renderNoPoints() {
    renderElement(this._eventsContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderEvents() {
    const groupedPoints = getPointsByDays(this._eventsPoints);
    if (!this._eventsPoints.length) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderDaysList();
    Object.keys(groupedPoints).map((day, index) => this._renderDays(groupedPoints[day].points, groupedPoints[day].points[0].dateFrom, index + 1));
  }
}
