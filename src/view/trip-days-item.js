import AbstractView from "./abstract";

const createDaysItemTemplate = () => {
  return `<li class="trip-days__item day"></li>`;
};

export default class DaysList extends AbstractView {

  getTemplate() {
    return createDaysItemTemplate();
  }
}
