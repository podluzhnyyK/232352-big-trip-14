import { MenuItem } from '../utils/const.js';
import AbstractView from './abstract.js';

const createSiteNavigationTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" id="${MenuItem.TABLE}" href="#">Table</a>
  <a class="trip-tabs__btn" id="${MenuItem.STATS}" href="#">Stats</a>
</nav>`;
};

export default class SiteNavigation extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteNavigationTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault;
    this._callback.menuClick(evt.target.id);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const items = this.getElement().querySelectorAll('.trip-tabs__btn');

    items.forEach((item) => {
      item.getAttribute('id') === menuItem ?
        item.classList.add('trip-tabs__btn--active') :
        item.classList.remove('trip-tabs__btn--active');
    });
  }
}
