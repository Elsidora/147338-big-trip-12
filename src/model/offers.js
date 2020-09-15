import Observer from "../utils/observer";

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers.slice();

    this._notify();
  }

  getOffers() {
    return this._offers;
  }
}
