import PointsModel from '../model/points.js';
import { createOffersMap } from '../utils/point-utils.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authirization, store) {
    this._endPoint = endPoint;
    this._authorization = authirization;
    this._store = store;
  }

  getPoints() {
    return this._load({url: 'points'})
      .then(Api.toJSON)
      .then((points) => points.map(PointsModel.adaptToClient));
  }

  getOffers() {
    return this._load({url: 'offers'})
      .then(Api.toJSON)
      .then((offers) => createOffersMap(offers));
  }

  getDestinations() {
    return this._load({url: 'destinations'})
      .then(Api.toJSON);
  }

  getAddData() {
    return Promise
      .all([
        this.getOffers(),
        this.getDestinations(),
      ])
      .then(([offers, destinations]) => {
        this._store.setOffers(offers);
        this._store.setDestinations(destinations);
      })
      .catch(() => {
        this._store.setOffers([]);
        this._store.setDestinations([]);
      });
  }

  getAllData() {
    return Promise
      .all([
        this.getPoints(),
        this.getOffers(),
        this.getDestinations(),
      ])
      .then(([points, offers, destinations]) => {
        this._store.setOffers(offers);
        this._store.setDestinations(destinations);
        return points;
      })
      .catch(() => {
        this._store.setOffers([]);
        this._store.setDestinations([]);
      });
  }

  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  addPoint(point) {
    return this._load({
      url:'points',
      method: Method.POST,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  deletePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });
  }

  sync(data) {
    return this._load({
      url: 'points/sync',
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  })  {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(responce) {
    if (
      responce.status < SuccessHTTPStatusRange.MIN ||
      responce.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${responce.status}: ${responce.statusText}`);
    }

    return responce;
  }

  static toJSON(responce) {
    return responce.json();
  }

  static catchError(err) {
    throw err;
  }
}
