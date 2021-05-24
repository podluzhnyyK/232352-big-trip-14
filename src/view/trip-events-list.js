import AbstractView from './abstract.js';

const createTripEeventsListTemplate = () => {
  return `<ul class="trip-events__list">
  </ul>`;
};

export default class TripEventsList extends AbstractView {
  getTemplate() {
    return createTripEeventsListTemplate();
  }
}
