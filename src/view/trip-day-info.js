import {createElement, helpersDate} from "../util";

const createTripDayInfoTemplate = (objectDate, index) => {
  const shortDate = helpersDate.humanizeEventDate(objectDate);
  const fullDate = helpersDate.humanizeEventDateWithoutTime(objectDate);
  return `<div class="day__info">
    <span class="day__counter">${index++}</span>
    <time class="day__date" datetime="${fullDate}">${shortDate}</time>
  </div>`;
};

export default class DaysList {
  constructor(objectDate, index) {
    this._objectDate = objectDate;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return createTripDayInfoTemplate(this._objectDate, this._index);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
