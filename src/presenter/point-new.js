import PointEditView from "../view/point-edit";
import TripPointsListView from "../view/trip-days-list";
import {remove, renderElement, RenderPosition} from "../utils/render";
import {getRandomInteger} from "../utils/common";
import {UserAction, UpdateType, TRANSFER} from "../const";

const BLANK_POINT = {
  type: TRANSFER[getRandomInteger(0, TRANSFER.length - 1)],
  cityName: ``,
  additionalOptions: [],
  price: ``,
  infoDestination: {
    description: ``,
    name: ``,
    pictures: [],
  },
  dateFrom: new Date(),
  dateTo: new Date(),
  isFavorite: false,
};

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._pointsListComponent = null;
    this._pointEditComponent = null;
    this._destroyCallback = null;

    this._pointsListComponent = new TripPointsListView();

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new PointEditView(BLANK_POINT);

    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    renderElement(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

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

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }


  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        point
    );
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
