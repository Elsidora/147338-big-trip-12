const getFormOffersTemplate = (additionalOptions) => {

  return additionalOptions.length
    ? `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${additionalOptions.map(({id, title, price}) => `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}">
            <label class="event__offer-label" for="event-offer-${id}-1">
              <span class="event__offer-title">${title}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${price}</span>
            </label>
          </div>
        `).join(``)}
        </div>
      </section>`
    : ``;
};

const getFormInfoTemplate = (infoDestination) => {
  const {description, pictures} = infoDestination;
  return pictures.length
    ? `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${pictures.map((src) => `
              <img class="event__photo" src="${src}" alt="Event photo">
            `).join(``)}
          </div>
        </div>
      </section>`
    : ``;
};

export const getPointDetailsTemplate = (additionalOptions, infoDestination) => {
  const formOffers = getFormOffersTemplate(additionalOptions);
  const formDestination = getFormInfoTemplate(infoDestination);
  return (`
    <section class="event__details">
      ${formOffers}
      ${formDestination}
    </section>
  `);
};
