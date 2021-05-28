import dayjs from 'dayjs';
import { humanizeTotalDuration } from './date-and-time.js';

const getItemsUniq = (items) => [...new Set(items)];

const getCostsByTripType = (points, type) => {
  const pointsByType = points.filter((point) => point.type === type);
  return pointsByType.reduce((sum, item) => sum + item.basePrice, 0);
};

const countPointsByTripType = (points, type) => {
  return points.filter((point) => point.type === type).length;
};

const getDurationByType = (points, type) => {
  const pointsTypes = points.filter((point) => point.type === type);
  const duration = pointsTypes.reduce((totalDuration, point) => {
    return totalDuration + dayjs(point.dateTo).diff(point.dateFrom,'minute');
  }, 0);
  return duration;
};

const sortItems = (a, b) => {
  return b[1] - a[1];
};


const getSortedStatistic = (types, characteristic) => {
  const statistics = new Map();
  let counter = 0;
  types.forEach((type) => {
    statistics.set(type, characteristic[counter]);
    counter++;
  });

  const sortedStatistic = new Map([...statistics.entries()].sort(sortItems));

  const sortedTypes = [...sortedStatistic.keys()];
  const sortedChars = [...sortedStatistic.values()];

  return {
    types: sortedTypes,
    characteristics: sortedChars,
  };
};

export {
  getItemsUniq,
  getCostsByTripType,
  countPointsByTripType,
  getDurationByType,
  humanizeTotalDuration,
  getSortedStatistic
};
