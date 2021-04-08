import {createSiteMenuTemplate} from './view/menu.js';
import {createSiteInfoTemplate} from './view/info.js';
import {createSiteCostTemplate} from './view/cost.js';
import {createSiteFilterTemplate} from './view/filter.js';
import {createSiteSortingTemplate} from './view/sorting.js';
import {createSiteEditFormTemplate} from './view/edit-form.js';
import {createSiteWaypointTemplate} from './view/waypoint.js';
import {createSiteInfoAboutTripTemplate} from './view/info-about-trip.js';
import {createSiteListTemplate} from './view/list.js';
import {generateTripEventsItem} from './mock/task.js';
import { allOffers } from './mock/offer';

const EVENTS_COUNT = 20;
const tripEvents = new Array(EVENTS_COUNT).fill().map(generateTripEventsItem).sort((a, b) => a.eventStartTime - b.eventStartTime);

const pageHeaderContainer = document.querySelector('.page-header');
const headerTripElement = pageHeaderContainer.querySelector('.trip-main');
const headerTripControls = headerTripElement.querySelector('.trip-controls');
const pageMainContainer = document.querySelector('.page-main');
const mainTripEventsContainer = pageMainContainer.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Добавляем шаблон для маршрута и стоимости

render(headerTripElement, createSiteInfoTemplate(), 'afterbegin');
const headerTripInfoContainer = headerTripElement.querySelector('.trip-main__trip-info');
render(headerTripInfoContainer, createSiteInfoAboutTripTemplate(tripEvents), 'beforeend');
render(headerTripInfoContainer, createSiteCostTemplate(tripEvents), 'beforeend');

// Компоненты управления поездкой

render(headerTripControls, createSiteMenuTemplate(), 'beforeend');
render(headerTripControls, createSiteFilterTemplate(), 'beforeend');

// Добавляем точки в список

render(mainTripEventsContainer, createSiteSortingTemplate(), 'beforeend');
render(mainTripEventsContainer, createSiteListTemplate(), 'beforeend');
const tripEventsList = mainTripEventsContainer.querySelector('.trip-events__list');
render(tripEventsList, createSiteEditFormTemplate(tripEvents[0], allOffers), 'beforeend');
for (let i = 1; i < EVENTS_COUNT; i++) {
  render(tripEventsList, createSiteWaypointTemplate(tripEvents[i]), 'beforeend');
}

generateTripEventsItem();
