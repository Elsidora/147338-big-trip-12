import {FilterType} from "../const";
import {isPointFutureExpiringToday, isPointPastExpiringToday} from "./point";

export const pointToFilterMap = {
  [FilterType.EVERYTHING]: (points) => points.slice(),

  [FilterType.FUTURE]: (points) => points
    .filter((point) => isPointFutureExpiringToday(point.dateFrom)),

  [FilterType.PAST]: (points) => points
    .filter((point) => isPointPastExpiringToday(point.dateTo)),
};

