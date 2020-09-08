import PointPresenter from "./point";

import NoPointsView from "../view/no-points";

import SortingView from "../view/sorting";
import TripDaysListView from "../view/trip-days-list";
import TripDaysItemView from "../view/trip-days-item";
import TripDayInfoView from "../view/trip-day-info";
import TripPointsListView from "../view/trip-points-list";

import {renderElement, RenderPosition, remove} from "../utils/render";
import {getPointsByDays, sortPriceDown, sortTimeDown} from "../utils/point";
import {SortType, UpdateType, UserAction} from "../const";

export default class Events {
  constructor(eventsContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._eventsContainer = eventsContainer;
    this._currentSortType = SortType.EVENT;
    this._arrPointPresenter = [];
    this._pointPresenter = {};

    this._sortComponent = null;

    this._tripDaysListComponent = new TripDaysListView();
    this._noPointsComponent = new NoPointsView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this); // привязываем к контексту

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {

    this._renderEvents();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortTimeDown);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortPriceDown);
    }
    return this._pointsModel.getPoints();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    // console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {

    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._taskPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда точка добавилась в избранное)
        this._clearEvents();
        this._renderEvents();
        break;
      case UpdateType.MAJOR:
        // - обновить весь список дней (например, при переключении фильтра)
        this._clearEvents({resetSortType: true});
        this._renderEvents();
        break;
    }
  }

  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearEvents();
    this._renderEvents();

    const itemDay = this._sortComponent.getElement().querySelector(`.trip-sort__item--day`);
    itemDay.textContent = this._currentSortType !== SortType.EVENT ? `` : `DAY`;
  }

  removePresenter(objPresenter) {
    Object
      .values(objPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _clearEvents({resetSortType = false} = {}) {
    if (this._currentSortType !== SortType.EVENT) {
      this.removePresenter(this._pointPresenter);
    } else {
      this._arrPointPresenter.forEach((item) => {
        this.removePresenter(item);
      });
      this._arrPointPresenter = [];
    }
    remove(this._tripDaysListComponent);
    remove(this._sortComponent);
    remove(this._noPointsComponent);

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortingView(this._currentSortType);


    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange); // добавляем прослушивание обработчика события
    renderElement(this._eventsContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(pointContainer, point) {
    const pointPresenter = new PointPresenter(pointContainer, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderDays(pointsArr, objectDate, index) {
    const tripDaysItemComponent = new TripDaysItemView();
    const tripDayInfoComponent = new TripDayInfoView(objectDate, index);
    const tripPointsListComponent = new TripPointsListView();

    if (this._currentSortType !== SortType.EVENT) {
      tripDayInfoComponent.getElement().innerHTML = ``;
    }

    renderElement(this._tripDaysListComponent, tripDaysItemComponent, RenderPosition.BEFOREEND);
    renderElement(tripDaysItemComponent, tripDayInfoComponent, RenderPosition.BEFOREEND);
    renderElement(tripDaysItemComponent, tripPointsListComponent, RenderPosition.BEFOREEND);
    pointsArr.map((point) => this._renderPoint(tripPointsListComponent, point));
    this._arrPointPresenter.push(this._pointPresenter);
  }

  _renderNoPoints() {
    renderElement(this._eventsContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  /*
  _renderDaysList() {

    renderElement(this._eventsContainer, this._tripDaysListComponent, RenderPosition.BEFOREEND);

    if (this._currentSortType !== SortType.EVENT) {
      const objectDate = ``;
      const index = ``;
      this._renderDays(this._getPoints(), objectDate, index);

    } else {
      const groupedPoints = getPointsByDays(this._getPoints());
      Object.keys(groupedPoints).map((day, index) => this._renderDays(groupedPoints[day].points, groupedPoints[day].points[0].dateFrom, index + 1));
    }
  }
  */


  _renderEvents() {

    if (!this._getPoints().length) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();

    renderElement(this._eventsContainer, this._tripDaysListComponent, RenderPosition.BEFOREEND);

    if (this._currentSortType !== SortType.EVENT) {
      const objectDate = ``;
      const index = ``;
      this._renderDays(this._getPoints(), objectDate, index);

    } else {
      const groupedPoints = getPointsByDays(this._getPoints());
      Object.keys(groupedPoints).map((day, index) => this._renderDays(groupedPoints[day].points, groupedPoints[day].points[0].dateFrom, index + 1));
    }
  }
}
