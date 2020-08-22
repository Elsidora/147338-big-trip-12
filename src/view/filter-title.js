import {createElement} from "../util";

export const createFilterTitleTemplate = () => {
  return (
    `<h2 class="visually-hidden">Filter events</h2>`
  );
};

export default class FilterTitle {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilterTitleTemplate();
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
