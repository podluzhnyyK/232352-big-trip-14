import { remove, render, RenderPosition } from '../utils/render.js';
import TripInformationView from '../view/trip-information.js';
import TripPriceView from '../view/trip-price.js';

export default class TripInfo {
  constructor (tripInfoContainer, pointsModel) {
    this._tripInfoContainer = tripInfoContainer;
    this._pointsModel = pointsModel;
    this._tripInformationElement = null;
    this._tripPriceElement = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTripinfo();
  }

  _renderTripinfo() {
    remove(this._tripInformationElement);
    remove(this._tripPriceElement);

    const points = this._pointsModel.getPoints();

    if (points.length === 0) {
      return;
    }

    this._tripInformationElement = new TripInformationView(points);
    this._tripPriceElement = new TripPriceView(points);

    render(this._tripInfoContainer, this._tripInformationElement, RenderPosition.AFTERBEGIN);
    render(this._tripInformationElement, this._tripPriceElement, RenderPosition.BEFOREEND);
  }

  _handleModelEvent() {
    this._renderTripinfo();
  }

}
