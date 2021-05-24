import dayjs from 'dayjs';

const getWeightForNullPrice = (priceA, priceB) => {
  if (priceA === null && priceB === null) {
    return 0;
  }

  if (priceA === null) {
    return 1;
  }

  if (priceB === null) {
    return -1;
  }

  return null;
};

const sortByPrice = (pointA, pointB) => {
  const weight = getWeightForNullPrice(pointA.basePrice, pointB.basePrice);

  if (weight !== null) {
    return weight;
  }

  return pointB.basePrice - pointA.basePrice;
};

const sortByTime = (pointA, pointB) => {
  const pointADuration = dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo));
  const pointBDuration = dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));

  return pointADuration - pointBDuration;
};

const sortByDay = (pointA, pointB) => {
  const pointADay = dayjs(pointA.dateFrom);
  const pointBDay = dayjs(pointB.dateFrom);

  return pointADay - pointBDay;
};

const isDateEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB);
};

const isPointComing = (point) => {
  return dayjs().isBefore(dayjs(point.dateFrom));
};

const isPointExpired = (point) => {
  return dayjs().isAfter(dayjs(point.dateTo));
};

const createOffersMap = (offers) => {
  const offersTypes = new Map();

  offers.forEach((offer) => {
    offersTypes.set(offer.type, offer.offers);
  });

  return offersTypes;
};

export {
  sortByPrice,
  sortByTime,
  sortByDay,
  isDateEqual,
  isPointComing,
  isPointExpired,
  createOffersMap
};
