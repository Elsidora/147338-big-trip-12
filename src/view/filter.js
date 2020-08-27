import AbstractView from "./abstract";
import {createElement} from "../utils/render";


const createFilterItemTemplate = (filter, isChecked) => {
  const {name} = filter;
  return (
    `<div class="trip-filters__filter">
      <input
      id="filter-${name}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${name}"
      ${isChecked ? `checked` : ``}
      >
      <label
      class="trip-filters__filter-label"
      for="filter-${name}">
      ${name[0].toUpperCase()}${name.slice(1)}
      </label>
    </div>`
  );
};

const createTitleFilterTemplate = () => {
  return `<h2 class="visually-hidden">Filter events</h2>`;
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join(``);
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
    this._titleFilter = null;
  }

  _getTitleFilterTemplate() {
    return createTitleFilterTemplate();
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getTitleFilterElement() {
    if (!this._titleFilter) {
      this._titleFilter = createElement(this._getTitleFilterTemplate());
    }

    return this._titleFilter;
  }
}
