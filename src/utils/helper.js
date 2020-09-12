import {ACTIVITY} from "../const";

export const getTypeInOrTypeTo = (type) => {
  const typeTitle = (!type) ? `` : type[0].toUpperCase() + type.slice(1);
  return (ACTIVITY.includes(type.toLowerCase()) ? `${typeTitle} in` : `${typeTitle} to`);
};


export const closeElement = {
  isEscapeEvent: (evt, action) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      action();
    }
  },
};
