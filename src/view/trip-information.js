import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const getTripInfo = (points) => {
  const sortedPoints = points.slice().sort((a,b) => a.dateFrom - b.dateFrom);
  const trip = [...new Set(sortedPoints.map((point) => point.destination.name))];
  return points.length > 3 ?
    `${trip[0]} &mdash; &hellip; &mdash; ${trip[trip.length - 1]}` :
    trip.join(' &mdash; ');
};

const getTripDuration = (points) => {
  const pointsSortedByStartDay = points.slice().sort((a,b) => a.dateFrom - b.dateFrom);
  const startDate = pointsSortedByStartDay[0].dateFrom;

  const pointsSortedByEndDate = points.slice().sort((a,b) => a.dateTo - b.dateTo);
  const endDate = pointsSortedByEndDate[pointsSortedByEndDate.length - 1].dateTo;

  const humanizedStartDate = dayjs(startDate).format('MMM DD');
  const humanizedEndDate = dayjs(endDate).month() > dayjs(startDate).month() ?
    dayjs(endDate).format('MMM DD') :
    dayjs(endDate).format('DD');

  return `${humanizedStartDate}&nbsp;&mdash;&nbsp;${humanizedEndDate}`;
};

const createTripInformationTemplate = (points) => {

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getTripInfo(points)}</h1>

    <p class="trip-info__dates">${getTripDuration(points)}</p>
  </div>
</section>`;
};


export default class TripInformation extends AbstractView {
  constructor (points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInformationTemplate(this._points);
  }
}
