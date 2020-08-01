import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createTripDaysTemplate} from "./view/trip-days.js";
import {createPointTemplate} from "./view/point.js";
import {createFormEditTemplate} from "./view/form-edit.js";
import {createTripInfoTemplate} from "./view/trip-info.js";
import {renderTripEventsList} from "./view/trip-list.js";
import {renderHtmlElement} from "./view/render.js";


const POINT_COUNT = 3;

const pageBodyElement = document.querySelector(`.page-body`);
const headerElement = pageBodyElement.querySelector(`.page-header`);
const mainElement = pageBodyElement.querySelector(`.page-main`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

renderHtmlElement(tripMainElement, createTripInfoTemplate(), `afterbegin`);
renderHtmlElement(tripControlsElement, createSiteMenuTemplate(), `beforeend`);
renderHtmlElement(tripControlsElement, createFilterTemplate(), `beforeend`);
renderHtmlElement(tripEventsElement, createSortingTemplate(), `beforeend`);
renderHtmlElement(tripEventsElement, createTripDaysTemplate(), `beforeend`);
renderTripEventsList(POINT_COUNT, tripEventsElement, renderHtmlElement, createFormEditTemplate, createPointTemplate);
