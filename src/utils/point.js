import moment from "moment";
// import flatpickr from "flatpickr";

export const getPointsByDays = (points) => {
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

export const helpersDate = {
  humanizeEventDate: (dateObject) => dateObject.toLocaleString(`en-US`, {day: `numeric`, month: `short`}),
  humanizeEventTime: (dateObject) => dateObject.toLocaleTimeString(`en-US`, {hour12: false, hour: `2-digit`, minute: `2-digit`}),
  humanizeEventDateTime: (dateObject) => moment(dateObject).format(`YYYY-MM-DD[T]HH:mm`),
  humanizeEventDateWithoutTime: (dateObject) => moment(dateObject).format(`YYYY-MM-DD`),
  humanizeEventTimeFormat: (dateObject) => moment(dateObject).format(`DD/MM/YY HH:mm`),
};
/*
export const getTimeFormat = (date) => {
  return `${moment(date).format(`DD/MM/YY HH:mm`)}`;
};
*/

const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return currentDate;
};

export const isPointFutureExpiringToday = (dateFrom) => {

  const currentDate = getCurrentDate();

  return currentDate.getTime() < dateFrom.getTime();
};

export const isPointPastExpiringToday = (dateTo) => {

  const currentDate = getCurrentDate();

  return currentDate.getTime() > dateTo.getTime();
};

const getWeightForNullItem = (a, b) => {
  if (a === null && b === null) {
    return 0;
  }

  if (a === null) {
    return 1;
  }

  if (b === null) {
    return -1;
  }

  return null;
};

export const sortPriceDown = (pointA, pointB) => {
  const weight = getWeightForNullItem(pointA.price, pointB.price);

  if (weight !== null) {
    return weight;
  }

  return pointB.price - pointA.price;
};

export const sortTimeDown = (pointA, pointB) => {
  const durationA = pointA.dateTo.getTime() - pointA.dateFrom.getTime();
  const durationB = pointB.dateTo.getTime() - pointB.dateFrom.getTime();
  const weight = getWeightForNullItem(durationA, durationB);

  if (weight !== null) {
    return weight;
  }

  return durationB - durationA;
};

export const sortStartDown = (pointA, pointB) => {
  return pointA.dateTo.getTime() - pointB.dateFrom.getTime();
};


export const isDatesEqual = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return true;
  }

  return moment(dateA).isSame(dateB, `day`);
};

