export const CITIES = [
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

export const PRICE = [50, 80, 100, 130, 160, 200];
export const TRANSFER = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
export const ACTIVITY = [`check-in`, `sightseeing`, `restaurant`];

export const OFFERSAVAILABLE = [
  {
    id: `luggage`,
    title: `Add luggage`,
    price: 30,
    types: [`taxi`, `bus`, `train`, `check-in`, `sightseeing`],
  },
  {
    id: `comfort`,
    title: `Switch to comfort class`,
    price: 100,
    types: [`taxi`, `bus`, `train`, `ship`, `flight`],
  },
  {
    id: `meal`,
    title: `Add meal`,
    price: 15,
    types: [`flight`, `transport`, `drive`, `sightseeing`, `restaurant`],
  },
  {
    id: `seats`,
    title: `Choose seats`,
    price: 5,
    types: [`bus`, `train`, `check-in`, `sightseeing`, `restaurant`],
  },
  {
    id: `train`,
    title: `Travel by train`,
    price: 30,
    types: [`ship`, `transport`, `drive`, `check-in`, `restaurant`],
  },
  {
    id: `press`,
    title: `Today's press`,
    price: 8,
    types: [`bus`, `train`, `transport`, `drive`, `check-in`],
  }
];

export const SortType = {
  EVENT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};
