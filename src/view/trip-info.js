import {CITIES} from '../const';
import {humanizeEventDate} from '../util';

const compareTripDates = (start, end) => {
  const startMonth = start.getMonth();
  const endMonth = end.getMonth();

  return startMonth < endMonth ? humanizeEventDate(end) : end.getDate();
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

export const createTripInfoTemplate = (startTrip, endTrip) => {
  const tripStartDate = humanizeEventDate(startTrip);
  const tripEndDate = compareTripDates(startTrip, endTrip);
  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getRouteOfEvent(uniqueCities)}</h1>
      <p class="trip-info__dates">${tripStartDate}&nbsp;&mdash;&nbsp;${tripEndDate}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
    </section>`
  );
};
