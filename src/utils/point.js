import moment from "moment";
import flatpickr from "flatpickr";

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
};

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

const flatpickrOptions = {
  enableTime: true,
  // eslint-disable-next-line camelcase
  time_24hr: true,
  altInput: true,
  altFormat: `d/m/y H:i`,
  dateFormat: `d/m/y H:i`,
  minDate: `today`,
  onReady(selectedDates, dateStr, instance) {
    instance._input.placeholder = instance.formatDate(new Date(), `d/m/y H:i`);
  },
};


export const getDateOfForm = () => {
  const startDateEventField = flatpickr(`#event-start-time-1`, flatpickrOptions);
  const endDateEventField = flatpickr(`#event-end-time-1`, flatpickrOptions);
  return (startDateEventField, endDateEventField);
};
