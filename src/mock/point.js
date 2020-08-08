import {getRandomInteger} from "../util.js";

const generateType = () => {
  const types = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check`,
    `Sightseeing`,
    `Restaurant`
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generateCityName = () => {
  const cities = [
    `Paris`,
    `London`,
    `Minsk`,
    `Calcutta`,
    `Geneva`,
    `Deli`
    `Venezia`,
    `Rim`,
    `Phuket`
  ];
  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

export const generateRoutePoint = () => {
  return {
    type: generateType(),
    cityName: generateCityName();

  };
};


