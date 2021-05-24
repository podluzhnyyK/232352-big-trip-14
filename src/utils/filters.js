import { FilterType } from './const.js';
import { isPointComing, isPointExpired } from './point-utils.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointComing(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointExpired(point)),
};
