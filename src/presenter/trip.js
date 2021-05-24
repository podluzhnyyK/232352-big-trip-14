import { SortType, UpdateType, UserAction } from '../utils/const.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils/point-utils.js';
import { remove, render, RenderPosition } from '../utils/render.js';
import { filter } from '../utils/filters.js';
import EmptyTripView from '../view/trip-empty.js';
import TripEventsListView from '../view/trip-events-list.js';
import TripSortView from '../view/trip-sort.js';
import PointPresenter, {State as TripPresenterViewState} from './point.js';
import PointNewPresenter from './point-new.js';
import LoadingView from '../view/loading.js';

export default class Trip {
  constructor(boardContainer, pointsModel, filterModel, api, store) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._boardContainer = boardContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;
    this._isLoading = true;
    this._api = api;
    this._store = store;

    this._sortComponent = null;

    this._tripListComponent = new TripEventsListView();
    this._tripEmptyComponent = new EmptyTripView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._tripListComponent, this._handleViewAction, this._store);
  }

  init() {
    render(this._boardContainer, this._tripListComponent, RenderPosition.BEFOREEND);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy() {
    this._clearBoard({resetSortType: true});

    remove(this._tripListComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._pointNewPresenter.init(callback);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch(this._currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
    }

    return filteredPoints.sort(sortByDay);
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter[update.id].setViewState(TripPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(TripPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            this._pointNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(TripPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType,update);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(TripPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new TripSortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._handleViewAction, this._handleModeChange, this._store);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderEmptyTrip() {
    render(this._tripListComponent, this._tripEmptyComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._tripListComponent, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._tripEmptyComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this._renderEmptyTrip();
      return ;
    }

    this._renderSort();
    this._renderPoints(points);
  }
}
