import Observer from "../utils/observer";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }
  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          price: point.base_price,
          dateFrom: point.date_from !== null ? new Date(point.date_from) : point.date_from, // На клиенте дата хранится как экземпляр Date
          dateTo: point.date_to !== null ? new Date(point.date_to) : point.date_to,
          infoDestination: point.destination,
          isFavorite: point.is_favorite,
          additionalOptions: point.offers,
          // type: point.type,
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.destination;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.offers;
    // delete adaptedPoint.type;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          "base_price": point.price,
          "date_from": point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null, // На сервере дата хранится в ISO формате
          "date_to": point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
          "destination": point.infoDestination,
          "is_favorite": point.isFavorite,
          "offers": point.additionalOptions,
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.price;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.infoDestination;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.additionalOptions;

    return adaptedPoint;
  }
}
