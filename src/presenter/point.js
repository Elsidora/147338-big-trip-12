import PointView from "../view/point";
import PointEditView from "../view/point-edit";

import {renderElement, RenderPosition, replace, remove} from "../utils/render";
import {getDateOfForm} from "../utils/point";
import {closeElement} from "../utils/helper";

export default class Point {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handlePointClick = this._handlePointClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._closeFormEditPoint = this._closeFormEditPoint.bind(this);

  }

  init(point) {
    this._point = point;

    // переменные для запоминания предыдущих компонентов
    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setPointClickHandler(this._handlePointClick);
    this._pointEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    // Добавим возможность повторно инициализировать презентер точки путешествия.
    // Для этого в методе init будем запоминать предыдущие компоненты.
    // Если они null, то есть не создавались, рендерим как раньше.
    // Если они отличны от null, то есть создавались, то заменяем их новыми и удаляем
    if (prevPointComponent === null || prevPointEditComponent === null) {
      renderElement(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._pointListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointListContainer.getElement().contains(prevPointEditComponent.getElement())) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

    renderElement(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
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

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._point,
            {
              isFavorite: !this._point.isFavorite
            }
        )
    );
  }

  _handleFormSubmit(point) {
    this._changeData(point);
    this._closeFormEditPoint();
  }

}
