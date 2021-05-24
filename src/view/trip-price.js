import AbstractView from './abstract.js';

const getTotalPrice = (points) => {
  return points.reduce((accumulator, currentPoint) => {
    let offersPrice = 0;
    offersPrice = currentPoint.offers.reduce((accumulator, offer) => {
      return accumulator + offer.price;
    }, 0);
    return accumulator + currentPoint.basePrice + offersPrice;
  },0);
};

const createTripPriceTemplate = (points) => {

  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(points)}</span>
</p>`;
};


export default class TripPrice extends AbstractView {
  constructor (points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripPriceTemplate(this._points);
  }
}
