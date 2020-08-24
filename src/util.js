import moment from "moment";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element); // prepend вставляет элемент в начало перед первым потомком родительского элементв
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderHtmlElement = (container, markupString, position) => {
  container.insertAdjacentHTML(position, markupString);
};

// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
export const createElement = (template) => {
  const newElement = document.createElement(`div`); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};
// Единственный нюанс, что HTML в строке должен иметь общую обёртку,
// то есть быть чем-то вроде <nav><a>Link 1</a><a>Link 2</a></nav>,
// а не просто <a>Link 1</a><a>Link 2</a>

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


export const getRandomInteger = (a = 0, b = 1) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  return Math.floor(min + Math.random() * (max - min + 1));
};

export const getRandomBoolean = () => Math.random() >= 0.5;

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getTypeInOrTypeTo = (arr, type) => {
  return (arr.includes(type.toLowerCase()) ? `${type} in` : `${type} to`);
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

export const flatpickrOptions = {
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
