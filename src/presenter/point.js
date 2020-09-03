import PointView from "../view/point";
import PointEditView from "../view/point-edit";

import {renderElement, RenderPosition, replace, remove} from "../utils/render";
import {getDateOfForm} from "../utils/point";
import {closeElement} from "../utils/helper";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Point {
  constructor(pointListContainer, changeData, changeMode) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

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
    // this._pointEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    // Добавим возможность повторно инициализировать презентер точки путешествия.
    // Для этого в методе init будем запоминать предыдущие компоненты.
    // Если они null, то есть не создавались, рендерим как раньше.
    // Если они отличны от null, то есть создавались, то заменяем их новыми и удаляем
    if (prevPointComponent === null || prevPointEditComponent === null) {
      renderElement(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
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


  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    this._mode = Mode.DEFAULT;
  }


  _closeFormEditPoint() {
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    closeElement.isEscapeEvent(evt, this._closeFormEditPoint);
    // this._pointEditComponent.reset(this._point);
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
