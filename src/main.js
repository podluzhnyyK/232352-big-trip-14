import SiteNavigationView from './view/site-navigation.js';
import { remove, render, RenderPosition } from './utils/render.js';
import BoardPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import { CONNECTION_OFFLINE, FilterType, MenuItem, UpdateType } from './utils/const.js';
import StatisticsView from './view/statistics.js';
import Api from './api/api.js';
import PointStore from './store.js';
import TripInfoPresenter from './presenter/trip-info.js';
import Store from './api/store.js';
import Provider from './api/provider.js';
import { isOnline } from './utils/common.js';
import { getToast } from './utils/toast.js';

const AUTHORIZATION = 'Basic aW22parabellum424';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const STORE_PREFIX = 'bigtrip-localstorage';
const STORE_VER = 'v14';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const pointStore = new PointStore();
const api = new Api(END_POINT, AUTHORIZATION, pointStore);
const appStore = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, appStore);

let statisticComonent = null;

const siteHeaderElement = document.querySelector('.page-header');
const siteMenuComponent = new SiteNavigationView();
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const bodyContainerElement = siteMainElement.querySelector('.page-body__container');
const boardContainerElement = siteMainElement.querySelector('.trip-events');
const addNewPointButton = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(filterElement, filterModel, pointsModel);
const boardPresenter = new BoardPresenter(boardContainerElement, pointsModel, filterModel, apiWithProvider, pointStore);
const tripInfoPresenter = new TripInfoPresenter(tripMainElement, pointsModel);


const handlePointNewFormClose = () => {
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
  addNewPointButton.removeAttribute('disabled');
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statisticComonent);
      boardPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      boardPresenter.init();
      break;
    case MenuItem.STATS:
      remove(statisticComonent);
      statisticComonent = new StatisticsView(pointsModel.getPoints());
      render(bodyContainerElement, statisticComonent, RenderPosition.BEFOREEND);
      siteMenuComponent.setMenuItem(MenuItem.STATS);
      boardPresenter.destroy();
      break;
  }
};


filterPresenter.init();
boardPresenter.init();
tripInfoPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  remove(statisticComonent);
  boardPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  boardPresenter.init();
  if (!isOnline()) {
    getToast('You can\'t create new points offline');
    return;
  }
  boardPresenter.createPoint(handlePointNewFormClose);
  addNewPointButton.setAttribute('disabled', 'disabled');
});

apiWithProvider
  .getAllData()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);

    render(siteNavigationElement, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    render(siteNavigationElement, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(CONNECTION_OFFLINE, '');
  apiWithProvider.sync();
  addNewPointButton.removeAttribute('disabled');

  if (pointStore._offers.length === 0) {
    apiWithProvider.getAddData().then(() => {
      boardPresenter.destroy();
      boardPresenter.init();
    });
  }
});

window.addEventListener('offline', () => {
  getToast('Connection lost');
  addNewPointButton.setAttribute('disabled', 'disabled');
  document.title += CONNECTION_OFFLINE;
});
