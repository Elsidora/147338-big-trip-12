import AbstractView from "./abstract";
import {helpersDate} from "../util";

const createTripDayInfoTemplate = (objectDate, index) => {
  const shortDate = helpersDate.humanizeEventDate(objectDate);
  const fullDate = helpersDate.humanizeEventDateWithoutTime(objectDate);
  return `<div class="day__info">
    <span class="day__counter">${index++}</span>
    <time class="day__date" datetime="${fullDate}">${shortDate}</time>
  </div>`;
};

export default class DaysList extends AbstractView {
  constructor(objectDate, index) {
    super();
    this._objectDate = objectDate;
    this._index = index;
  }

  getTemplate() {
    return createTripDayInfoTemplate(this._objectDate, this._index);
  }
}
