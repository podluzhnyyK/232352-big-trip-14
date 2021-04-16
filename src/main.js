import TripMenuView from './view/menu.js';
import TripSectionView from './view/info.js';
import TripCostView from './view/cost.js';
import TripEventsFiltersView from './view/filter.js';
//import TripEventsSortView from './view/sorting.js';
//import TripEventsEditFormView from './view/edit-form.js';
//import TripEventsItemView from './view/waypoint.js';
import TripInfoView from './view/info-about-trip.js';
//import TripEventsListView from './view/list.js';
import TripEventsEmptyListView from './view/events-empty-list.js';
import {generateTripEventsItem} from './mock/task.js';
//import { allOffers } from './mock/offer';
import {render, RenderPosition} from './utils/render.js';
import TripPresenter from './presenter/trip.js';

const EVENTS_COUNT = 20;
const tripEvents = new Array(EVENTS_COUNT).fill().map(generateTripEventsItem).sort((a, b) => a.eventStartTime - b.eventStartTime);


const pageHeaderContainer = document.querySelector('.page-header');
const headerTripElement = pageHeaderContainer.querySelector('.trip-main');
const headerTripControls = headerTripElement.querySelector('.trip-controls');
const pageMainContainer = document.querySelector('.page-main');
const mainTripEventsContainer = pageMainContainer.querySelector('.trip-events');

// const renderTripEvent = (eventsListElement, tripEvent) => {

//   const tripEventComponent = new TripEventsItemView(tripEvent);
//   const tripEventEditComponent = new TripEventsEditFormView(tripEvent, allOffers);
//   const replaceCardToEditForm = () => {
//     replace(tripEventEditComponent, tripEventComponent);
//     document.addEventListener('keydown', onDocumentEscapePress);
//   };

//   const replaceEditFormToCard = () => {
//     replace(tripEventComponent, tripEventEditComponent);
//   };

//   const onEventCardRollupButtonClick = () => {
//     replaceCardToEditForm();
//   };

//   const onEventEditFormRollupButtonClick = () => {
//     replaceEditFormToCard();
//   };

//   const onEventEditFormSubmit = () => {
//     replaceEditFormToCard();
//   };

//   const onDocumentEscapePress = (evt) => {
//     if (evt.key === 'Escape' || evt.key === 'Esc') {
//       replaceEditFormToCard();
//       document.removeEventListener('keydown', onDocumentEscapePress);
//     }
//   };

//   tripEventComponent.setClickHandler(onEventCardRollupButtonClick);
//   tripEventEditComponent.setEditClickHandler(onEventEditFormRollupButtonClick);
//   tripEventEditComponent.setFormSubmitHandler(onEventEditFormSubmit);

//   render(eventsListElement, tripEventComponent, RenderPosition.BEFOREEND);
// };

const renderOverallTripInfo = () => {
  render(headerTripElement, new TripSectionView(), RenderPosition.AFTERBEGIN);
  const headerTripInfoContainer = headerTripElement.querySelector('.trip-main__trip-info');
  render(headerTripInfoContainer, new TripInfoView(tripEvents), RenderPosition.BEFOREEND);
  render(headerTripInfoContainer, new TripCostView(tripEvents), RenderPosition.BEFOREEND);
};

const renderTripControls = () => {
  render(headerTripControls, new TripMenuView(), RenderPosition.BEFOREEND);
  render(headerTripControls, new TripEventsFiltersView(), RenderPosition.BEFOREEND);
};

// const renderTripEvents = () => {
//   const tripEventsListComponent = new TripEventsListView();
//   render(mainTripEventsContainer, new TripEventsSortView(), RenderPosition.BEFOREEND);
//   render(mainTripEventsContainer, tripEventsListComponent, RenderPosition.BEFOREEND);
//   tripEvents.forEach((tripEvent) => renderTripEvent(tripEventsListComponent, tripEvent));
// };

const tripPresenter = new TripPresenter(mainTripEventsContainer);

renderTripControls();

if (tripEvents.length > 0) {
  renderOverallTripInfo();
  tripPresenter.init(tripEvents);
} else {
  render(mainTripEventsContainer, new TripEventsEmptyListView(), RenderPosition.BEFOREEND);
}
