import AbstractView from "./abstract";

export const createTripInfoTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
    </section>`
  );
};

export default class TripInfo extends AbstractView {

  getTemplate() {
    return createTripInfoTemplate();
  }
}
