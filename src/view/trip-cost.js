import AbstractView from "./abstract";

const createTripCostTemplate = (points) => {

  const fullCost = points.reduce((acc, point) => {
    return acc + point.price;
  }, 0);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullCost}</span>
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


