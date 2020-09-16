import AbstractView from "./abstract";
import {MenuItem} from "../const";

export const createSiteMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a
          class="trip-tabs__btn trip-tabs__btn--active"
          data-menu-item="${MenuItem.TABLE}"
          href="#">
          Table
      </a>
      <a
          class="trip-tabs__btn"
          data-menu-item="${MenuItem.STATS}"
          href="#">
          Stats
      </a>
    </nav>`;
};


export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._currentMenuType);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
    this._callback.menuClick(evt.target.dataset.menuItem);
    const menuList = this.getElement().querySelectorAll(`.trip-tabs__btn`);
    for (let listItem of menuList) {
      listItem.classList.remove(`trip-tabs__btn--active`);
    }
    evt.target.classList.add(`trip-tabs__btn--active`);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}
