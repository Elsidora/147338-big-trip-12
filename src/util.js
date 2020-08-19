import moment from "moment";

export const renderHtmlElement = (container, markupString, position) => {
  container.insertAdjacentHTML(position, markupString);
};

export const getRandomInteger = (a = 0, b = 1) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  return Math.floor(min + Math.random() * (max - min + 1));
};

export const getRandomBoolean = () => Math.random() >= 0.5;

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    // поменять элементы местами
    // мы используем для этого синтаксис "деструктурирующее присваивание"
    // то же самое можно записать как:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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


