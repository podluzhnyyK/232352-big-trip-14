import { FilterPick } from './const.js';
import { isPointComing, isPointExpired } from './point-utils.js';

export const filter = {
  [FilterPick.EVERYTHING]: (points) => points,
  [FilterPick.FUTURE]: (points) => points.filter((point) => isPointComing(point)),
  [FilterPick.PAST]: (points) => points.filter((point) => isPointExpired(point)),
};
