import PointPresenter from "./point";
import PointNewPresenter from "./point-new";
import LoadingView from "../view/list-loading";
import NoPointsView from "../view/no-points";

import SortingView from "../view/sorting";
import TripDaysListView from "../view/trip-days-list";
import TripDaysItemView from "../view/trip-days-item";
import TripDayInfoView from "../view/trip-day-info";
import TripPointsListView from "../view/trip-points-list";

import {renderElement, RenderPosition, remove} from "../utils/render";
import {getPointsByDays, sortPriceDown, sortTimeDown, sortStartDown} from "../utils/point";
import {pointToFilterMap} from "../utils/filter";
import {SortType, UpdateType, UserAction} from "../const";

export default class Events {
  constructor(eventsContainer, pointsModel, filterModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._eventsContainer = eventsContainer;
    this._currentSortType = SortType.EVENT;
    this._arrPointPresenter = [];
    this._pointPresenter = {};
    this._isLoading = true;
    this._api = api;

    this._sortComponent = null;

    this._tripDaysListComponent = new TripDaysListView();
    this._noPointsComponent = new NoPointsView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this); // привязываем к контексту

    this._pointNewPresenter = new PointNewPresenter(this._tripDaysListComponent, this._handleViewAction);
  }

  init() {

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderEvents();
  }

  destroy() {
    this._clearEvents({resetSortType: true});
    // remove(this._sortComponent);
    remove(this._tripDaysListComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._pointNewPresenter.init(callback);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = pointToFilterMap[filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortTimeDown);
      case SortType.PRICE:
        return filteredPoints.sort(sortPriceDown);

      default:
        return filteredPoints.sort(sortStartDown);
    }

  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
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
        this._api.updatePoint(update).then((response) => {
          this._pointsModel.updatePoint(updateType, response);
        });
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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
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
    this._pointNewPresenter.destroy();
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
    remove(this._loadingComponent);

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

  _renderLoading() {
    renderElement(this._eventsContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoPoints() {
    renderElement(this._eventsContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderEvents() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

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
