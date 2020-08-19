import {isPointFutureExpiringToday, isPointPastExpiringToday} from "../util";

const pointToFilterMap = {
  everything: (points) => points.slice(),

  future: (points) => points
    .filter((point) => isPointFutureExpiringToday(point.dateFrom)),

  past: (points) => points
    .filter((point) => isPointPastExpiringToday(point.dateTo)),
};

export const generateFilter = (points) => {
  return Object.entries(pointToFilterMap).map(([filterName, arrayPoints]) => {
    return {
      name: filterName,
      arr: arrayPoints(points),
    };
  });
};
