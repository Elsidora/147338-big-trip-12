import {PRICE, CITIES} from "../const";
import {getRandomInteger, shuffle, getRandomBoolean} from "../util";
const maxDay = 6;
const maxHour = 23;
const maxMinute = 59;
const Count = {
  MIN: 1,
  MAX: 5,
};

const generateCityName = () => {
  return CITIES[getRandomInteger(0, CITIES.length - 1)];
};

const offers = {
  Taxi: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  Train: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  Ship: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  Transport: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  Drive: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  Flight: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  [`Check-in`]: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  Sightseeing: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  Restaurant: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
};

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const getPictureSrc = () => {
  return `http://picsum.photos/248/152?r=${Math.random()}`;
};

const getRandomPrice = () => {
  const randomIndex = getRandomInteger(0, PRICE.length - 1);
  return PRICE[randomIndex];
};

/*
Метод getDate() возвращает
день месяца указанной даты по местному времени.

Метод Date.parse() разбирает строковое представление
даты и возвращает количество миллисекунд,
прошедших с 1 января 1970 года 00:00:00 по UTC.

Метод setDate() устанавливает день месяца указанной
даты по местному времени.

Метод setHours() устанавливает часы указанной даты
по местному времени и возвращает количество миллисекунд,
прошедших с 1 января 1970 00:00:00 по UTC до времени,
представляемого обновлённым экземпляром Date.
*/

const generateDate = (minDay, minHour, minMinute) => {
  const daysGap = getRandomInteger(minDay, maxDay);
  const hoursGap = getRandomInteger(minHour, maxHour);
  const minutesGap = getRandomInteger(minMinute, maxMinute);
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() - daysGap);
  currentDate.setHours(currentDate.getHours() - hoursGap);
  currentDate.setMinutes(currentDate.getMinutes() - minutesGap);

  return currentDate;
};

export const generateRoutePoint = () => {
  const types = Object.keys(offers);
  const type = types[getRandomInteger(0, types.length - 1)];
  const options = shuffle(offers[type].slice());
  const additionalOptions = options.slice(0, getRandomInteger(0, options.length));
  const sentence = shuffle(text.split(`. `).slice());
  const description = sentence.slice(0, getRandomInteger(1, sentence.length)).join(`. `);

  const pictures = new Array(getRandomInteger(Count.MIN, Count.MAX)).fill().map(getPictureSrc);

  const dateFrom = generateDate(0, 0, 0, maxDay, maxHour, maxMinute);
  const dateTo = generateDate(-maxDay / 2, -maxHour / 2, -maxMinute / 2, maxDay / 2, maxHour / 2, maxMinute / 2);

  return {
    type,
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


