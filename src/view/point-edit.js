// import he from "he";
import SmartView from "./smart";
import {TRANSFER, ACTIVITY, CITIES, OFFERSAVAILABLE} from "../const";
import {getPointDetailsTemplate} from './point-details';
import {helpersDate} from '../utils/point';
import {getTypeInOrTypeTo} from "../utils/helper";
import flatpickr from "flatpickr";

// import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const types = TRANSFER.concat(ACTIVITY);

const getItemTypeTemplate = (arr, checkedType, id) => {
  return arr.map((type) => `<div class="event__type-item">
    <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checkedType === type ? ` checked` : ``}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${type[0].toUpperCase() + type.slice(1)}</label>
    </div>`
  ).join(``);
};

const createPointEditTemplate = (data, offers, destinations) => {
  const {
    id,
    type,
    additionalOptions,
    infoDestination,
    dateFrom,
    dateTo,
    price,
    isFavorite,
    isDisabled,
    isSaving,
    isDeleting
  } = data;

  const {description, name, pictures} = data.infoDestination;
  const typeTitle = getTypeInOrTypeTo(type);

  // const pointDetails = getPointDetailsTemplate(additionalOptions, infoDestination);
  const itemTransferTemplate = getItemTypeTemplate(TRANSFER, type, id);
  const itemActivityTemplate = getItemTypeTemplate(ACTIVITY, type, id);

  const cityOptions = CITIES.map((item) => `<option value="${item}">`).join(``);

  const getFormOffersTemplate = () => {

    return additionalOptions.length
      ? `
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${additionalOptions.map(({title, price}) =>
            `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer">
              <label class="event__offer-label" for="event-offer-${id}">
                <span class="event__offer-title">${title}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${price}</span>
              </label>
            </div>
          `).join(``)}
          </div>
        </section>`
      : ``;
  };

  const getFormInfoTemplate = (infoDestination) => {
    // const {description, pictures} = infoDestination;
    return pictures.length
      ? `
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${pictures.map((item) => `
                <img class="event__photo" src="${item.src}" alt="${item.description}">
              `).join(``)}
            </div>
          </div>
        </section>`
      : ``;
  };

  const formOffers = getFormOffersTemplate(additionalOptions);
  const formDestination = getFormInfoTemplate(infoDestination);

  return (
    `<form class="${data ? `trip-events__item` : ``}"  event  event--edit" action="#" method="post" ${(isSaving || isDeleting) ? `disabled` : ``}>
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input
          class="event__type-toggle  visually-hidden"
          id="event-type-toggle-${id}"
          type="checkbox"

          >

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${itemTransferTemplate}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
            ${itemActivityTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${typeTitle}
        </label>
        <input
          class="event__input  event__input--destination"
          id="event-destination-${id}"
          type="text"
          name="event-destination"
          value="${name}"
          placeholder="Minsk"
          list="destination-list-${id}"

          >
        <datalist id="destination-list-${id}">
          ${cityOptions}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">
          From
        </label>
        <input
          class="event__input  event__input--time"
          id="event-start-time-${id}"
          type="text"
          name="event-start-time"
          placeholder="${helpersDate.humanizeEventTimeFormat(dateFrom)}"
          >
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">
          To
        </label>
        <input
          class="event__input  event__input--time"
          id="event-end-time-${id}"
          type="text"
          name="event-end-time"
          placeholder="${helpersDate.humanizeEventTimeFormat(dateTo)}"
          >
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input
          class="event__input  event__input--price"
          id="event-price-${id}"
          type="number"
          name="event-price"
          value="${price}"
          ${isDisabled ? `disabled` : ``}
          required>
      </div>

      <button
        class="event__save-btn  btn  btn--blue"
        type="submit"

        >${isSaving ? `Saving...` : `Save`}
      </button>
      <button
        class="event__reset-btn"
        type="reset"
        ${isDisabled ? `disabled` : ``}
        >
        ${isDeleting ? `Deleting...` : `Delete`}

      </button>

      <input
        id="event-favorite-1"
        class="event__favorite-checkbox  visually-hidden"
        type="checkbox"
        name="event-favorite"
        ${isFavorite === true ? `checked` : ``}

        >
      <label class="event__favorite-btn" for="event-favorite-${id}">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${formOffers}
      ${formDestination}
    </section>
  </form>`
  );
};

export default class PointEdit extends SmartView {
  constructor(point) {
    super();
    this._data = PointEdit.parsePointToData(point);
    this._datepickerStart = null;
    this._datepickerEnd = null;


    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._pointClickHandler = this._pointClickHandler.bind(this);
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);

    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._typeClickHandler = this._typeClickHandler.bind(this);
    this._destinationClickHandler = this._destinationClickHandler.bind(this);


    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  /*
  reset(point) {
    this.updateData(
        PointEdit.parsePointToData(point)
    );
  }
  */


  getTemplate() {
    return createPointEditTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepicker() {
    if (this._datepickerStart || this._datepickerEnd) {
      this._datepickerStart.destroy();
      this._datepickerEnd.destroy();
      this._datepickerStart = null;
      this._datepickerEnd = null;
    }
    if (this._data) {
      this._datepickerStart = flatpickr(
          this.getElement().querySelector(`input[name=event-start-time]`),
          {
            enableTime: true,
            /* eslint-disable-next-line */
            time_24hr: true,
            altInput: true,
            altFormat: `d/m/y H:i`,
            dateFormat: `d/m/y H:i`,
            minDate: `today`,
            defaultDate: this._data.dateFrom,
            onChange: this._startDateChangeHandler
          }
      );
      this._datepickerEnd = flatpickr(
          this.getElement().querySelector(`input[name=event-end-time]`),
          {
            enableTime: true,
            /* eslint-disable-next-line */
            time_24hr: true,
            altInput: true,
            altFormat: `d/m/y H:i`,
            dateFormat: `d/m/y H:i`,
            minDate: `today`,
            defaultDate: this._data.dateTo,
            onChange: this._endDateChangeHandler
          }
      );
    }
  }

  _startDateChangeHandler([userDate]) {
    if (userDate !== this._data.dateFrom) {
      this.updateData({

        dateFrom: userDate,
        dateTo: this._data.dateTo,

      }, true);
    }
  }

  _endDateChangeHandler([userDate]) {
    if (userDate !== this._data.dateTo) {
      this.updateData({

        dateFrom: this._data.dateFrom,
        dateTo: userDate,

      }, true);
    }
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, this._favoriteToggleHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._typeClickHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationClickHandler);
  }

  _favoriteToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite
    });
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true);
  }

  _pointClickHandler(evt) {
    evt.preventDefault();
    this._callback.pointClick();
  }


  /*
  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }
  */

  _favoriteToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseDataToPoint(this._data));
  }

  _typeClickHandler(evt) {
    evt.preventDefault();
    this._data.type = types.filter((item) => item === evt.target.value);
    this._data.additionalOptions = OFFERSAVAILABLE.filter((item) => item.types.includes(evt.target.value));
    this.updateData({
      type: this._data.type[0],
      additionalOptions: this._data.additionalOptions,
    });
  }

  _destinationClickHandler(evt) {
    evt.preventDefault();
    this._data.cityName = evt.target.value;

    this._data.infoDestination = this._data.infoDestination;
    this.updateData({
      cityName: this._data.cityName,
      infoDestination: this._data.infoDestination,
    });
  }

  setPointClickHandler(callback) {
    this._callback.pointClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._pointClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEdit.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  static parsePointToData(data) {
    return Object.assign(
        {},
        data,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    if (data.isFavorite) {
      data.isFavorite = true;
    }

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
