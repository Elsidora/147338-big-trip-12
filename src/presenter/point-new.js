import PointEditView from "../view/point-edit";
import TripPointsList from "../view/trip-points-list";
import {generateId} from "../mock/point";
import {remove, renderElement, RenderPosition} from "../utils/render";
import {UserAction, UpdateType} from "../const";

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;

    this._pointEditComponent = null;
    this._destroyCallback = null;
    this._pointsListComponent = new TripPointsList();

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new PointEditView();
    console.log("FOREVER");
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    renderElement(this._pointsListComponent, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        // Пока у нас нет сервера, который бы после сохранения
        // выдывал честный id задачи, нам нужно позаботиться об этом самим
        Object.assign({id: generateId()}, point)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
