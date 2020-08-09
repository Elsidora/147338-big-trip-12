import {createSiteMenuTemplate} from "./view/site-menu";
import {createFilterTemplate} from "./view/filter";
import {createSortingTemplate} from "./view/sorting";
import {createTripDaysTemplate} from "./view/trip-days";
import {createPointTemplate} from "./view/point";
import {createFormEditTemplate} from "./view/form-edit";
import {createTripInfoTemplate} from "./view/trip-info";
import {renderHtmlElement} from "./util";
import {generateRoutePoint} from './mock/point';

const POINT_COUNT = 8;

const points = new Array(POINT_COUNT).fill().map(generateRoutePoint);

const pageBodyElement = document.querySelector(`.page-body`);
const headerElement = pageBodyElement.querySelector(`.page-header`);
const mainElement = pageBodyElement.querySelector(`.page-main`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

const renderTripEventsList = () => {
  const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);
  for (let i = 0; i < POINT_COUNT; i += 1) {
    renderHtmlElement(tripEventsListElement, createPointTemplate(points[i]), `beforeend`);
  }
};

renderHtmlElement(tripMainElement, createTripInfoTemplate(), `afterbegin`);
renderHtmlElement(tripControlsElement, createSiteMenuTemplate(), `beforeend`);
renderHtmlElement(tripControlsElement, createFilterTemplate(), `beforeend`);
renderHtmlElement(tripEventsElement, createSortingTemplate(), `beforeend`);
renderHtmlElement(tripEventsElement, createFormEditTemplate(), `beforeend`);
renderHtmlElement(tripEventsElement, createTripDaysTemplate(), `beforeend`);
renderTripEventsList();
