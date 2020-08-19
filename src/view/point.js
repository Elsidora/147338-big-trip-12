import {ACTIVITY} from '../const';
import {shuffle, helpersDate, getTypeInOrTypeTo} from '../util';

const createItemOffersTemplate = (additionalOptions) => {
  const additionalOptionsShallow = shuffle(additionalOptions.slice());
  return additionalOptionsShallow.slice(0, 3).map(({title, price}) =>
    `
      <li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </li>
    `).join(``);
};

const getEventTimeDiff = (startTime, endTime) => {
  let start = startTime.getTime(); // возвращается начальное время в миллисекундах
  let end = endTime.getTime(); // конечное
  if (end <= start) {
    return false;
  }
  const result = {};

  let secondDiff = (end - start) / 1000; // разница в секундах между конечным и начальным временем
  const secondsCount = {
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  Object.keys(secondsCount).forEach((key) => {
    result[key] = Math.floor(secondDiff / secondsCount[key]);
    secondDiff -= result[key] * secondsCount[key];
  });
  return result;
};

const addZero = (digit) => {
  return digit < 10
    ? `0` + digit
    : digit;
};
const renderTimeDiff = (diffObj) => {
  const {day, hour, minute} = diffObj;
  let res = ``;
  if (day > 0) {
    res += addZero(day) + `D `;
  }
  if (hour) {
    res += addZero(hour) + `H `;
  }
  if (minute) {
    res += addZero(minute) + `M`;
  }
  return res;
};

export const createPointTemplate = (point) => {

  const {type, cityName, additionalOptions, dateFrom, dateTo, price} = point;

  const itemOffersTemplate = createItemOffersTemplate(additionalOptions);
  const instructionForType = getTypeInOrTypeTo(ACTIVITY, type);
  const beginDatePoint = helpersDate.humanizeEventDateTime(dateFrom);
  const endDatePoint = helpersDate.humanizeEventDateTime(dateTo);
  const startTime = helpersDate.humanizeEventTime(dateFrom);
  const endTime = helpersDate.humanizeEventTime(dateTo);
  const resultObj = getEventTimeDiff(dateFrom, dateTo);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${instructionForType} ${cityName}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time
            class="event__start-time"
            datetime="${beginDatePoint}">
              ${startTime}
          </time>
      —
          <time
            class="event__end-time"
            datetime="${endDatePoint}">
              ${endTime}
          </time>
        </p>
        <p class="event__duration">${renderTimeDiff(resultObj)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${itemOffersTemplate}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};
