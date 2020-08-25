import {CITIES} from '../const';
import {helpersDate, createElement} from '../util';

const compareTripDates = (start, end) => {
  const startMonth = start.getMonth();
  const endMonth = end.getMonth();

  return startMonth < endMonth ? helpersDate.humanizeEventDate(end) : end.getDate();
};

const getUniqueCities = (arrayCities) => {
  return [...new Set(arrayCities)];
};
const uniqueCities = getUniqueCities(CITIES);
const getRouteOfEvent = (uniqueArrayCities) => {
  let result = ``;
  const length = uniqueArrayCities.length;
  const separator = `&mdash;`;
  if (length <= 3) {
    uniqueArrayCities.forEach((city, index) => {
      if (index < length - 1) {
        result += `${city} ${separator} `;
      } else {
        result += `${city}`;
      }
    });
    return result;
  }
  const first = uniqueArrayCities[0];
  const last = uniqueArrayCities[length - 1];
  return `${first} ${separator} ... ${separator} ${last}`;
};

const createTripRouteTemplate = (startTrip, endTrip) => {
  const tripStartDate = helpersDate.humanizeEventDate(startTrip);
  const tripEndDate = compareTripDates(startTrip, endTrip);
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${getRouteOfEvent(uniqueCities)}</h1>
      <p class="trip-info__dates">${tripStartDate}&nbsp;&mdash;&nbsp;${tripEndDate}</p>
    </div>`
  );
};

export default class TripRoute {
  constructor(startTrip, endTrip) {
    this._startTrip = startTrip;
    this._endTrip = endTrip;
    this._element = null;
  }

  getTemplate() {
    return createTripRouteTemplate(this._startTrip, this._endTrip);
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
