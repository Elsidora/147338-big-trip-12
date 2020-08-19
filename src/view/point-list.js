import {createPointTemplate} from './point';
import {helpersDate} from '../util';

const getPointsByDays = (points) => {
  const groupedPoints = {};

  points.forEach((item) => {
    const dayTitle = `${helpersDate.humanizeEventDate(item.dateFrom)}`;
    // dayTitle - месяц, число

    if (typeof groupedPoints[dayTitle] === `undefined`) {
      groupedPoints[dayTitle] = {
        dayTitle,
        points: []
      };
    }
    groupedPoints[dayTitle].points.push(item);
  });

  return groupedPoints; // возвращает объект массивов групп точек путешествия, распределенных по числам месяца
};

export const createTripDaysTemplate = (points) => {

  const groupedPoints = getPointsByDays(points);

  const daysMarkup = Object.keys(groupedPoints).map((day, index) => {
    return `
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${index + 1}</span>
          <time class="day__date" datetime="${helpersDate.humanizeEventDateWithoutTime(groupedPoints[day].points[0].dateFrom)}">${helpersDate.humanizeEventDate(groupedPoints[day].dayTitle)}</time>
        </div>

        <ul class="trip-events__list">
          ${groupedPoints[day].points.map(createPointTemplate).join(``)}
        </ul>
      </li>
    `;
  }).join(``);

  return (
    `<ul class="trip-days">${daysMarkup}</ul>`
  );
};


