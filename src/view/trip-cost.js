import AbstractView from "./abstract";
/*
const getFullCost = (points) => {
  let fullSum = 0;
  let sum = 0;

  points.map((point) => {
    sum += point.price;
    if (point.additionalOptions.length) {
      for (let i = 0; i < point.additionalOptions.length; i += 1) {
        sum += point.additionalOptions[i].price;
      }
    }
  });

  fullSum += sum;
  return fullSum;
};
*/

const createTripCostTemplate = (points) => {
  // const fullCost = getFullCost(points);
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
    </p>`
  );
};

export default class TripCost extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }
}


