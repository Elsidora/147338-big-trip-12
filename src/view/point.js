import moment from 'moment';
import {ACTIVITY} from "../const";
import {shuffle} from '../util';

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

const getTypeInOrTypeTo = (type) => {
  return (ACTIVITY.includes(type.toLowerCase()) ? `${type} in` : `${type} to`);
};

/*
// функция выставления впереди нуля
const addZero = (digit) => {
  return digit < 10
    ? `0` + digit
    : digit;
};

const humanizeDuration = (finishDate, startDate) => {
  const startMoment = moment(finishDate)
    .subtract(finishDate.getSeconds(), `seconds`) // subtract - метод для вычитания
    .subtract(finishDate.getMilliseconds(), `milliseconds`);
  const finishMoment = moment(startDate)
    .subtract(startDate.getSeconds(), `seconds`)
    .subtract(startDate.getMilliseconds(), `milliseconds`);

  const duration = moment.duration(startMoment.diff(finishMoment));
  const readableDurations = [];

  if (duration.days() > 0) {
    readableDurations.push(`${addZero(duration.days())}D`);
  }

  if (duration.hours() > 0) {
    readableDurations.push(`${addZero(duration.hours())}H`);
  }

  if (duration.minutes() > 0) {
    readableDurations.push(`${addZero(duration.minutes())}M`);
  }

  return readableDurations.join(` `);
};
*/

const getHoursAndMinutes = (timeObject) => {
  return {
    minutes: timeObject.getMinutes(),
    hours: timeObject.getHours(),
  };
};

const getEventTimeDiff = (startTime, endTime) => {
  const start = startTime.getTime();
  const end = endTime.getTime();

  let sec = Math.abs(end - start) / 1000;
  const result = {};
  const s = {
    day: 86400,
    hour: 3600,
    minute: 60,
  };
  Object.keys(s).forEach((key) => {
    result[key] = Math.floor(sec / s[key]);
    sec -= result[key] * s[key];
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
  let result = ``;
  if (day) {
    result += addZero(day) + `D `;
  }
  if (hour) {
    result += addZero(hour) + `H `;
  }
  if (minute) {
    result += addZero(minute) + `M`;
  }
  return result;
};

export const createPointTemplate = (point) => {

  const {type, cityName, additionalOptions, dateFrom, dateTo, price} = point;

  const itemOffersTemplate = createItemOffersTemplate(additionalOptions);
  const instructionForType = getTypeInOrTypeTo(type);
  const startTime = getHoursAndMinutes(dateFrom);
  const endTime = getHoursAndMinutes(dateTo);
  const timeDiff = getEventTimeDiff(dateFrom, dateTo);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${instructionForType} ${cityName}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${moment(dateFrom).format(`YYYY-MM-DD[T]HH:mm`)}>${startTime.hours}:${startTime.minutes}</time>
      —
          <time class="event__end-time" datetime=${moment(dateTo).format(`YYYY-MM-DD[T]HH:mm`)}>${endTime.hours}:${endTime.minutes}</time>
        </p>
        <p class="event__duration">${renderTimeDiff(timeDiff)}</p>
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
