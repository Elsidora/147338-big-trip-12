export const renderTripEventsList = (count, element, renderFunction, createFunctionOne, createFunctionTwo) => {
  const tripEventsListElement = element.querySelector(`.trip-events__list`);
  renderFunction(tripEventsListElement, createFunctionOne(), `beforeend`);
  for (let i = 0; i < count; i += 1) {
    renderFunction(tripEventsListElement, createFunctionTwo(), `beforeend`);
  }
};
