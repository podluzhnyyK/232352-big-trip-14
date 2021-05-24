import { FilterType } from '../utils/const.js';
import Observer from '../utils/observer.js';

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }

  setFilter(UpdateType, filter) {
    this._activeFilter = filter;
    this._notify(UpdateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
