import {createSiteMenuTemplate} from './view/menu.js';
import {createSiteInfoTemplate} from './view/info.js';
import {createSiteCostTemplate} from './view/cost';
import {createSiteFilterTemplate} from './view/filter.js';
import {createSiteSortingTemplate} from './view/sorting.js';
import {createSiteFormCreationTemplate} from './view/form-creation.js';
import {createSiteEditFormTemplate} from './view/edit-form.js';
import {createSiteWaypointTemplate} from './view/waypoint.js';
import {createSiteNavigationTemplate} from './view/navigation.js';
import {createSiteListTemplate} from './view/list.js';

const TASK_COUNT = 3;

const position = {
  BEFORE_BEGIN: 'beforebegin', // до самого element (до открывающего тега)
  AFTER_BEGIN: 'afterbegin', // сразу после открывающего тега  element (перед первым потомком)
  BEFORE_END: 'beforeend', // сразу перед закрывающим тегом element (после последнего потомка)
  AFTER_END: 'afterend', // после element (после закрывающего тега)
};

// Функция для отображения данных на странице
const render = (container, template, place = position.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
};

// Хедер страницы
const siteHeaderElement = document.querySelector('.page-header');

// Добавляем шаблон для маршрута и стоимости
const siteHeaderTripMainElement = siteHeaderElement.querySelector('.trip-main');
render(siteHeaderTripMainElement, createSiteInfoTemplate(), position.AFTER_BEGIN);
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-info');
render(siteHeaderInfoElement, createSiteNavigationTemplate(), position.AFTER_BEGIN);
render(siteHeaderInfoElement, createSiteCostTemplate());

// Добавляем меню
const siteHeaderMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
render(siteHeaderMenuElement, createSiteMenuTemplate());

// Добавляем фильтры
const siteHeaderFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
render(siteHeaderFilterElement, createSiteFilterTemplate());

// Контент страницы
const siteMainElement = document.querySelector('.page-main');
const siteMainEventsElement = siteMainElement.querySelector('.trip-events');

// Добавляем сортировку
render(siteMainEventsElement, createSiteSortingTemplate());

// Добавляем шаблон для точек
render(siteMainEventsElement, createSiteListTemplate());

//Добавляем точки в список
const siteMainPointListElement = siteMainEventsElement.querySelector('.trip-events__list');
for (let i = 0; i < TASK_COUNT; i++) {
  render(siteMainPointListElement, createSiteWaypointTemplate());
}

// Добавляем форму редактирования в начало списка
render(siteMainPointListElement, createSiteEditFormTemplate(), position.AFTER_BEGIN);
