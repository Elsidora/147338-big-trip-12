import {createElement} from "../util";

const createDaysItemTemplate = () => {
  return `<li class="trip-days__item day"></li>`;
};

export default class DaysList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDaysItemTemplate();
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
