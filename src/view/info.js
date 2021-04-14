import AbstractView from './abstract.js';

const createSiteInfoTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
</section>`;
};

export default class TripSection extends AbstractView {
  getTemplate() {
    return createSiteInfoTemplate();
  }
}
