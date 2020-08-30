import PointView from "../view/point";
import PointEditView from "../view/point-edit";

import {renderElement, RenderPosition, replace, remove} from "../utils/render";
import {getDateOfForm} from "../utils/point";
import {closeElement} from "../utils/helper";

export default class Point {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handlePointClick = this._handlePointClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._closeFormEditPoint = this._closeFormEditPoint.bind(this);

  }

  init(point) {
    this._point = point;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setPointClickHandler(this._handlePointClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    renderElement(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);

  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
  }


  _closeFormEditPoint() {
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    closeElement.isEscapeEvent(evt, this._closeFormEditPoint);
  }

  _handleEditClick() {
    this._replacePointToForm();
    getDateOfForm();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handlePointClick() {
    this._closeFormEditPoint();
  }

  _handleFormSubmit() {
    this._closeFormEditPoint();
  }

}
