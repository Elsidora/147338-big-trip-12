import {PRICE} from "../const";
import {getRandomInteger, shuffle} from "../util";

const Count = {
  MIN: 1,
  MAX: 5,
};

const generateCityName = () => {
  const cities = [
    `Paris`,
    `London`,
    `Minsk`,
    `Calcutta`,
    `Geneva`,
    `Deli`,
    `Venezia`,
    `Rim`,
    `Phuket`
  ];
  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

const offers = {
  Taxi: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  Train: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  Ship: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  Transport: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  Drive: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  Flight: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  [`Check-in`]: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  Sightseeing: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  Restaurant: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
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


export const generateRoutePoint = () => {
  const types = Object.keys(offers);
  const type = types[getRandomInteger(0, types.length - 1)];
  const options = shuffle(offers[type].slice());
  const additionalOptions = options.slice(0, getRandomInteger(0, options.length - 1));
  const sentence = shuffle(text.split(`. `).slice());
  const description = sentence.slice(0, getRandomInteger(1, sentence.length - 1)).join(`. `);
  const pictures = new Array(getRandomInteger(Count.MIN, Count.MAX)).fill().map(getPictureSrc);

  return {
    type,
    cityName: generateCityName(),
    additionalOptions,
    infoDestination: {
      description,
      pictures,
    },
    price: getRandomPrice(),
  };
};


