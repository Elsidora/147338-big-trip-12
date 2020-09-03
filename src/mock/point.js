import {PRICE, CITIES, TRANSFER, ACTIVITY, OFFERSAVAILABLE} from "../const";
import {getRandomInteger, shuffle, getRandomBoolean} from "../utils/common";

const Count = {
  MIN: 1,
  MAX: 5,
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
const startDay = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // Путешествия началось за три дня до текущей даты. (Date.now() - возвращает кол-во миллисек. текущей даты)
const startDayTimestamp = startDay.getTime(); // предполагаемое время начала путешествия (getTime() возвращает числовое значение указанной даты в виде количества миллисекунд, прошедших с 00:00:00 1 января 1970 года по UTC)
const maxDurationDays = 6; // максимальное количество дней продолжительности путешествия
const maxDurationMilliseconds = maxDurationDays * 24 * 60 * 60 * 1000; // продолжительность путешествия в миллисек.
const endDayTimestamp = getRandomInteger(startDayTimestamp, startDayTimestamp + maxDurationMilliseconds); // получили предполагаемое время окончания путешествия в миллисек.
let tempStartPoint = startDayTimestamp; // к этой переменной будет доступ только у функции генерации dateTo


const generateCityName = () => {
  return CITIES[getRandomInteger(0, CITIES.length - 1)];
};

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const getPictureSrc = () => `http://picsum.photos/248/152?r=${Math.random()}`;

const getRandomPrice = () => PRICE[getRandomInteger(0, PRICE.length - 1)];

const getRandomOffers = (count) => shuffle(OFFERSAVAILABLE.slice()).slice(0, count);


const getPointDateTo = () => {
  const tempEndPoint = getRandomInteger(tempStartPoint, Math.floor(tempStartPoint + (endDayTimestamp - tempStartPoint) / 2));

  tempStartPoint = tempEndPoint + 30 * 60 * 1000;

  return tempEndPoint;
};

const generateDestinations = () => {
  const destination = [
    `Amsterdam`,
    `Geneva`,
    `Chamonix`,
    `Saint Petersburg`
  ];

  const randomIndex = getRandomInteger(0, destination.length - 1);

  return destination[randomIndex];
};

const generatePointOfRoute = () => {
  const types = TRANSFER.concat(ACTIVITY);
  const type = types[getRandomInteger(0, types.length - 1)];
  const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);
  const offersCount = (TRANSFER.indexOf(type) !== -1) ? getRandomInteger(0, OFFERSAVAILABLE.length - 1) : getRandomInteger(0, Math.floor(OFFERSAVAILABLE.length / 2) - 1);

  const additionalOptions = getRandomOffers(offersCount);

  const sentence = shuffle(text.split(`. `).slice());
  const description = sentence.slice(0, getRandomInteger(1, sentence.length)).join(`. `);

  const pictures = new Array(getRandomInteger(Count.MIN, Count.MAX)).fill().map(getPictureSrc);

  const dateFrom = new Date(tempStartPoint);
  const dateTo = new Date(getPointDateTo()); // здесь мы получаем дату окончания и одновременно обновляем переменную с датой начала следующего промежутка


  return {
    id: generateId(),
    types,
    type,
    typeTitle,
    destination: generateDestinations(),
    cityName: generateCityName(),
    additionalOptions,
    infoDestination: {
      description,
      pictures,
    },
    price: getRandomPrice(),
    dateFrom,
    dateTo,
    isFavorite: getRandomBoolean(),
  };
};

export const generatePointsArray = (count) => {
  return new Array(count).fill().map(generatePointOfRoute);
};


