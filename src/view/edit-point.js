import SmartView from './smart.js';
import { humanizeDateAndHours } from '../utils/date-and-time.js';
import { TYPES, DEFAULT_POINT, FLATPICKR_SETTINGS } from '../utils/const.js';
import { getRandomInteger, isOnline } from '../utils/common.js';
import flatpickr from 'flatpickr';
import he from 'he';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createDestanationPointsList = (destinations) => {
  return destinations.map((destination) => {
    return `<option value="${destination.name}"></option>`;
  }).join('');
};

const createAvailableOffersList = (point, availableOffers, isDisabled) => {
  const offers = availableOffers.get(point.type);

  return offers.map((offer) => {
    const randomId = getRandomInteger(0, 100000);

    return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${randomId}-1" type="checkbox" data-title="${offer.title}" name="event-offer-${randomId}" ${point.offers.findIndex((item) => item.title === offer.title) !== -1 ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
    <label class="event__offer-label" for="event-offer-${randomId}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
  }).join('');
};

const createOffersSection = (point, availableOffers, isDisabled) => {
  if (!isOnline()) {
    return '';
  }

  return (availableOffers.get(point.type).length > 0) ?
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${createAvailableOffersList(point, availableOffers, isDisabled)}
      </div>
    </section>` :
    '';
};

const createEventTypeList = (types, currentType) => {
  return types.map((type) => {
    const typeWithCapitalLetter = type.charAt(0).toUpperCase() + type.slice(1);
    return `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === currentType ? 'checked' : ''}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${typeWithCapitalLetter}</label>
</div>`;
  }).join(' ');
};

const createPhotosList = (point) => {
  const pictures = point.destination.pictures;

  return pictures.map((picture) => {
    return `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
  }).join(' ');
};

const createPhotosTemplate = (point) => {
  return point.hasPictures ?
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${createPhotosList(point)}
      </div>
    </div>` :
    '';
};

const createDescriptionTemplate = (point) => {
  return point.hasDescription ? `<p class="event__destination-description">${point.destination.description}</p>` : '';
};

const createDestinationTemplate = (point, destinations) => {
  return point.hasDestination ?
    `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${createDescriptionTemplate(point, destinations)}

    ${createPhotosTemplate(point)}
    </section>` :
    '';
};

const createRollupButton = (point) => {
  return point.hasDestination ?
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>` :
    '';
};

const createEditPointTemplate = (point, offers, destinations) => {
  const {type, hasDestination, dateFrom, dateTo, basePrice, isDisabled, destination, isSaving, isDeleting} = point;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeList(TYPES, type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${hasDestination ? he.encode(destination.name) : ''}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
        <datalist id="destination-list-1">
         ${createDestanationPointsList(destinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDateAndHours(dateFrom)}" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDateAndHours(dateTo)}" ${isDisabled ? 'disabled' : ''}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>
      ${createRollupButton(point)}
    </header>
    <section class="event__details">

      ${createOffersSection(point, offers, isDisabled)}

      ${createDestinationTemplate(point,destinations)}
    </section>
  </form>
</li>`;
};

export default class PointForm extends SmartView {
  constructor (point = DEFAULT_POINT, store) {
    super();
    this._data = PointForm.parsePointToData(point);
    this._dateFromPicker = null;
    this._dateToPicker = null;
    this._availableOffers = store.getOffers();
    this._destinations = store.getDestinations();

    this._clickHandler = this._clickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._pointTypeChangeHandler = this._pointTypeChangeHandler.bind(this);
    this._pointDestinationChangeHandler = this._pointDestinationChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDateFromPicker();
    this._setDateToPicker();
  }

  removeElement() {
    super.removeElement();

    if (this._dateFromPicker) {
      this._dateFromPicker.destroy();
      this._dateFromPicker = null;
    }

    if (this._dateToPicker) {
      this._dateToPicker.destroy();
      this._dateToPicker = null;
    }
  }

  getTemplate() {
    return createEditPointTemplate(this._data, this._availableOffers, this._destinations);
  }

  reset(point) {
    this.updateData(
      PointForm.parsePointToData(point),
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setClickHAndler(this._callback.click);
    this._setDateFromPicker();
    this._setDateToPicker();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-list')
      .addEventListener('change', this._pointTypeChangeHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._pointDestinationChangeHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('input', this._priceInputHandler);

    if (this.getElement().querySelector('.event__available-offers')) {
      this.getElement()
        .querySelector('.event__available-offers')
        .addEventListener('change', this._offersChangeHandler);
    }
  }

  _setDateFromPicker() {
    if (this._dateFromPicker) {
      this._dateFromPicker.destroy();
      this._dateFromPicker = null;
    }

    this._dateFromPicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      Object.assign({},
        FLATPICKR_SETTINGS,
        {
          defaultDate: this._data.dateFrom,
          onClose: this._dateFromChangeHandler,
        }),
    );
  }

  _setDateToPicker() {
    if (this._dateToPicker) {
      this._dateToPicker.destroy();
      this._dateToPicker = null;
    }

    this._dateToPicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      Object.assign({},
        FLATPICKR_SETTINGS,
        {
          minDate: this._data.dateFrom,
          defaultDate: this._data.dateTo,
          onClose: this._dateToChangeHandler,
        }),
    );
  }

  _pointTypeChangeHandler(evt) {
    evt.preventDefault();
    const newType = evt.target.value;
    this.updateData({
      type: newType,
      offers: [],
    });
  }

  _pointDestinationChangeHandler(evt) {
    evt.preventDefault();
    const destinationName = evt.target.value;
    const newDestination = this._destinations.find((destination) => destination.name === destinationName);

    if (!newDestination) {
      evt.target.setCustomValidity('Select a waypoint from the list');
      evt.target.reportValidity();
      return;
    }

    this.updateData({
      destination: newDestination,
      hasDestination: newDestination !== null,
      hasDescription: newDestination.description !== null,
      hasPictures: newDestination.pictures.length > 0,
    });
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _formSubmitHandler(evt) {
    const destinationInput = document.querySelector('.event__input--destination');
    evt.preventDefault();
    if (!this._data.hasDestination) {
      destinationInput.setCustomValidity('Select a waypoint from the list');
      destinationInput.reportValidity();
      return;
    }
    this._callback.formSubmit(PointForm.parseDataToPoint(this._data));
  }

  _priceInputHandler(evt) {
    evt.preventDefault();

    this.updateData({
      basePrice: evt.target.value,
    }, true);
  }

  _offersChangeHandler(evt) {
    const clickedOfferTitle = evt.target.closest('[data-title]').dataset.title;
    const availableOffersByType = this._availableOffers.get(this._data.type);
    const currentOffers = this._data.offers;

    const chosenOffer = availableOffersByType.find(
      (item) => item.title === clickedOfferTitle);

    const selectedOffers = currentOffers.find(
      (item) => item.title === clickedOfferTitle) ?
      currentOffers.filter((item) => item.title !== clickedOfferTitle) :
      [...currentOffers.slice(), chosenOffer];

    this.updateData({
      offers: selectedOffers,
    });
  }

  _dateFromChangeHandler([userDate]) {
    this.updateData({
      dateFrom: userDate,
    });
  }

  _dateToChangeHandler([userDate]) {
    this.updateData({
      dateTo: userDate,
    });
  }

  setClickHAndler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._clickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointForm.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  static parsePointToData(point) {
    return Object.assign({},
      point,
      {
        hasDestination: point.destination !== null,
        hasDescription: point.destination !== null && point.destination.description !== null,
        hasPictures: point.destination !== null && point.destination.pictures.length !== 0,
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    if (!data.hasDestination) {
      data.destination = null;
    }

    if (data.hasDestination && !data.hasDescription) {
      data.destination.description = null;
    }

    if (data.hasDestination && !data.hasPictures) {
      data.destination.pictures = [];
    }

    delete data.hasDestination;
    delete data.hasDescription;
    delete data.hasPictures;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;
    return data;
  }
}
