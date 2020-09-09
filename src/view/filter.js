import AbstractView from "./abstract";
import {createElement} from "../utils/render";


const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name} = filter;
  return (
    `<div class="trip-filters__filter">
      <input
      id="filter-${name}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type}"
      ${type === currentFilterType ? `checked` : ``}
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

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join(``);
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._titleFilter = null;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  _getTitleFilterTemplate() {
    return createTitleFilterTemplate();
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  getTitleFilterElement() {
    if (!this._titleFilter) {
      this._titleFilter = createElement(this._getTitleFilterTemplate());
    }

    return this._titleFilter;
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
