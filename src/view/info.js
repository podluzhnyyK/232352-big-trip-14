import {createElement} from '../mock/utils.js';

const createSiteInfoTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
</section>`;
};

export default class TripSection {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteInfoTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
