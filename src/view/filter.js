import {createElement} from "../util";

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

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join(``);
  return (
    `<div class="trip-wrap">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${filterItemsTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>`
  );
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null; // вызываем конструктор, в котором происходит инициализация приватного свойства _element со значением null
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
