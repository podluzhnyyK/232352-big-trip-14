const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const KeyCode = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const FLATPICKR_SETTINGS = {
  enableTime: true,
  dateFormat: 'd/m/y H:i',
  timeDay: true,
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdatePick = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterPick = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const DEFAULT_POINT = {
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: null,
  isFavorite: false,
  type: 'taxi',
  offers: [],
};

const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats',
};

const CONNECTION_OFFLINE = ' [offline]';

const STATS_SETTINGS = {
  barHeight: 55,
  chartType: 'horizontalBar',
  dataBackgroundColor: '#ffffff',
  dataHoverBackgroundColor: '#ffffff',
  dataAnchor: 'start',
  fontColor: '#000000',
  fontSize: 13,
  optionsAnchor: 'end',
  optionsAlign: 'start',
  titleFontSize: 23,
  titlePosition: 'left',
  padding: 5,
  barThickness: 44,
  minBarLength: 50,
};

const StatsTitleType ={
  MONEY: 'MONEY',
  TYPE: 'TYPE',
  TIME_SPENT: 'TIME-SPENT',
};

export {
  TYPES,
  SortType,
  KeyCode,
  FLATPICKR_SETTINGS,
  UserAction,
  UpdatePick,
  FilterPick,
  DEFAULT_POINT,
  MenuItem,
  CONNECTION_OFFLINE,
  STATS_SETTINGS,
  StatsTitleType
};
