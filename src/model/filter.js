import { FilterPick } from '../utils/const.js';
import Observer from '../utils/observer.js';

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterPick.EVERYTHING;
  }

  setFilter(UpdatePick, filter) {
    this._activeFilter = filter;
    this._notify(UpdatePick, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
