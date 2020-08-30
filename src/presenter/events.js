import PointPresenter from "./point";

import NoPointsView from "../view/no-points";

import SortingView from "../view/sorting";
import TripDaysListView from "../view/trip-days-list";
import TripDaysItemView from "../view/trip-days-item";
import TripDayInfoView from "../view/trip-day-info";
import TripPointsListView from "../view/trip-points-list";

import {renderElement, RenderPosition, remove} from "../utils/render";
import {getPointsByDays, sortPriceDown, sortTimeDown} from "../utils/point";
import {SortType} from "../const";

export default class Events {
  constructor(eventsContainer) {
    this._eventsContainer = eventsContainer;
    this._currentSortType = SortType.EVENT;
    this._sortingComponent = new SortingView();
    this._tripDaysListComponent = new TripDaysListView();
    this._noPointsComponent = new NoPointsView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this); // привязываем к контексту
  }

  init(eventsPoints) {
    this._eventsPoints = eventsPoints.slice();

    this._sourcedEventsPoints = eventsPoints.slice(); // копия точек для сортировки

    this._renderEvents();
  }

  _sortPoints(sortType) {

    switch (sortType) {
      case SortType.TIME:
        this._eventsPoints.sort(sortTimeDown);
        break;
      case SortType.PRICE:
        this._eventsPoints.sort(sortPriceDown);
        break;
      default:
        this._eventsPoints = this._sourcedEventsPoints.slice();
    }

    this._currentSortType = sortType;

  }

  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearDaysList();
    this._renderDaysList();

    const itemDay = this._sortingComponent.getElement().querySelector(`.trip-sort__item--day`);
    if (this._currentSortType !== SortType.EVENT) {
      itemDay.textContent = ``;
    } else {
      itemDay.textContent = `DAY`;
    }
  }

  _clearDaysList() {
    remove(this._tripDaysListComponent);
  }

  _renderSort() {
    renderElement(this._eventsContainer, this._sortingComponent, RenderPosition.BEFOREEND);

    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange); // добавляем прослушивание обработчика события
  }

  _renderPoint(pointContainer, point) {
    const pointPresenter = new PointPresenter(pointContainer);
    pointPresenter.init(point);
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
  }

  _renderNoPoints() {
    renderElement(this._eventsContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderDaysList() {
    const groupedPoints = getPointsByDays(this._eventsPoints);
    renderElement(this._eventsContainer, this._tripDaysListComponent, RenderPosition.BEFOREEND);

    if (this._currentSortType !== SortType.EVENT) {
      const objectDate = ``;
      const index = ``;
      this._renderDays(this._eventsPoints, objectDate, index);

    } else {
      Object.keys(groupedPoints).map((day, index) => this._renderDays(groupedPoints[day].points, groupedPoints[day].points[0].dateFrom, index + 1));
    }
  }


  _renderEvents() {

    if (!this._eventsPoints.length) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderDaysList();
  }
}
