import Observer from '../utils/observer.js';

export default class Points extends Observer {
  constructor() {
    super(),
    this._points = [];
  }

  setPoints(UpdatePick, points) {
    this._points = points.slice();

    this._notify(UpdatePick);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(UpdatePick, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0,index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(UpdatePick, update);
  }

  addPoint(UpdatePick, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(UpdatePick, update);
  }

  deletePoint(UpdatePick, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(UpdatePick);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        basePrice: point.base_price,
        dateFrom: new Date(point.date_from),
        dateTo: new Date(point.date_to),
        isFavorite: point.is_favorite,
      },
    );

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'base_price': +point.basePrice,
        'date_from': point.dateFrom.toISOString(),
        'date_to': point.dateTo.toISOString(),
        'is_favorite': point.isFavorite,
      },
    );

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
