import TripMenuView from './view/menu.js';
import TripSectionView from './view/info.js';
import TripCostView from './view/cost.js';
import TripEventsFiltersView from './view/filter.js';
import TripEventsSortView from './view/sorting.js';
import TripEventsEditFormView from './view/edit-form.js';
import TripEventsItemView from './view/waypoint.js';
import TripInfoView from './view/info-about-trip.js';
import TripEventsListView from './view/list.js';
import TripEventsEmptyListView from './view/events-empty-list.js';
import {generateTripEventsItem} from './mock/task.js';
import { allOffers } from './mock/offer';
import {render, RenderPosition} from './utils.js';

const EVENTS_COUNT = 20;
const tripEvents = new Array(EVENTS_COUNT).fill().map(generateTripEventsItem).sort((a, b) => a.eventStartTime - b.eventStartTime);

const pageHeaderContainer = document.querySelector('.page-header');
const headerTripElement = pageHeaderContainer.querySelector('.trip-main');
const headerTripControls = headerTripElement.querySelector('.trip-controls');
const pageMainContainer = document.querySelector('.page-main');
const mainTripEventsContainer = pageMainContainer.querySelector('.trip-events');

const renderTripEvent = (eventsListElement, tripEvent) => {

  const tripEventComponent = new TripEventsItemView(tripEvent);
  const tripEventEditComponent = new TripEventsEditFormView(tripEvent, allOffers);
  const replaceCardToEditForm = () => {
    eventsListElement.replaceChild(tripEventEditComponent.getElement(), tripEventComponent.getElement());
    document.addEventListener('keydown', onDocumentEscapePress);
  };

  const replaceEditFormToCard = () => {
    eventsListElement.replaceChild(tripEventComponent.getElement(), tripEventEditComponent.getElement());
  };

  const onEventCardRollupButtonClick = () => {
    replaceCardToEditForm();
  };

  const onEventEditFormRollupButtonClick = () => {
    replaceEditFormToCard();
  };

  const onEventEditFormSubmit = (evt) => {
    evt.preventDefault();
    replaceEditFormToCard();
  };

  const onDocumentEscapePress = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      replaceEditFormToCard();
      document.removeEventListener('keydown', onDocumentEscapePress);
    }
  };

  tripEventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', onEventCardRollupButtonClick);
  tripEventEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', onEventEditFormRollupButtonClick);
  tripEventEditComponent.getElement().querySelector('form').addEventListener('submit', onEventEditFormSubmit);

  render(eventsListElement, tripEventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderOverallTripInfo = () => {
  render(headerTripElement, new TripSectionView().getElement(), RenderPosition.AFTERBEGIN);
  const headerTripInfoContainer = headerTripElement.querySelector('.trip-main__trip-info');
  render(headerTripInfoContainer, new TripInfoView(tripEvents).getElement(), RenderPosition.BEFOREEND);
  render(headerTripInfoContainer, new TripCostView(tripEvents).getElement(), RenderPosition.BEFOREEND);
};

const renderTripControls = () => {
  render(headerTripControls, new TripMenuView().getElement(), RenderPosition.BEFOREEND);
  render(headerTripControls, new TripEventsFiltersView().getElement(), RenderPosition.BEFOREEND);
};

const renderTripEvents = () => {
  const tripEventsListComponent = new TripEventsListView();
  render(mainTripEventsContainer, new TripEventsSortView().getElement(), RenderPosition.BEFOREEND);
  render(mainTripEventsContainer, tripEventsListComponent.getElement(), RenderPosition.BEFOREEND);
  tripEvents.forEach((tripEvent) => renderTripEvent(tripEventsListComponent.getElement(), tripEvent));
};

if (tripEvents.length > 0) {
  renderOverallTripInfo();
  renderTripControls();
  renderTripEvents();
} else {
  renderTripControls();
  render(mainTripEventsContainer, new TripEventsEmptyListView().getElement(), RenderPosition.BEFOREEND);
}
