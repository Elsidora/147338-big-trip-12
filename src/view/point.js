const createItemOffersTemplate = (additionalOptions) => {
  return additionalOptions.map(({title, price}) => `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>
  `).join(``);
};

const getTypeInOrTypeTo = (type) => {
  const typeInValues = [`check-in`, `sightseeing`, `restaurant`];

  return (typeInValues.includes(type.toLowerCase()) ? `${type} in` : `${type} to`);
};

export const createPointTemplate = (point) => {

  const {type, cityName, additionalOptions, price} = point;

  const itemOffersTemplate = createItemOffersTemplate(additionalOptions);
  const instructionForType = getTypeInOrTypeTo(type);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${instructionForType} ${cityName}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
        </p>
        <p class="event__duration">30M</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${itemOffersTemplate}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};
