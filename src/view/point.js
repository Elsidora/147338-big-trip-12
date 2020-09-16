import AbstractView from "./abstract";
import {shuffle} from '../utils/common';
import {helpersDate} from '../utils/point';
import {getTypeInOrTypeTo} from '../utils/helper';
import flatpickr from "flatpickr";

const createItemOffersTemplate = (additionalOptions) => {
  const additionalOptionsShallow = shuffle(additionalOptions.slice());
  return additionalOptionsShallow.slice(0, 3).map(({title, price}) =>
    `
      <li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </li>
    `).join(``);
};

const getEventTimeDiff = (startTime, endTime) => {
  let start = startTime.getTime(); // возвращается начальное время в миллисекундах
  let end = endTime.getTime(); // конечное
  if (end <= start) {
    return false;
  }
  const result = {};

  let secondDiff = (end - start) / 1000; // разница в секундах между конечным и начальным временем
  const secondsCount = {
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  Object.keys(secondsCount).forEach((key) => {
    result[key] = Math.floor(secondDiff / secondsCount[key]);
    secondDiff -= result[key] * secondsCount[key];
  });
  return result;
};

const addZero = (digit) => {
  return digit < 10
    ? `0` + digit
    : digit;
};
const renderTimeDiff = (diffObj) => {
  const {day, hour, minute} = diffObj;
  let res = ``;
  if (day > 0) {
    res += addZero(day) + `D `;
  }
  if (hour) {
    res += addZero(hour) + `H `;
  }
  if (minute) {
    res += addZero(minute) + `M`;
  }
  return res;
};

export const createPointTemplate = (point) => {

  const {type, infoDestination, additionalOptions, dateFrom, dateTo, price} = point;

  const itemOffersTemplate = createItemOffersTemplate(additionalOptions);
  const instructionForType = getTypeInOrTypeTo(type);
  const beginDatePoint = helpersDate.humanizeEventDateTime(dateFrom);
  const endDatePoint = helpersDate.humanizeEventDateTime(dateTo);
  const startTime = helpersDate.humanizeEventTime(dateFrom);
  const endTime = helpersDate.humanizeEventTime(dateTo);
  const resultObj = getEventTimeDiff(dateFrom, dateTo);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${instructionForType} ${infoDestination.name}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time
            class="event__start-time"
            datetime="${beginDatePoint}">
              ${startTime}
          </time>
      —
          <time
            class="event__end-time"
            datetime="${endDatePoint}">
              ${endTime}
          </time>
        </p>
        <p class="event__duration">${renderTimeDiff(resultObj)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${itemOffersTemplate}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export default class Point extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
    this._data = Point.parsePointToData(point);
    this._datepickerStart = null;
    this._datepickerEnd = null;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point);
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
          document.querySelector(`input[name=event-start-time]`),
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
          document.querySelector(`input[name=event-end-time]`),
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

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
    this._setDatepicker();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
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

