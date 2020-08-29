export const getTypeInOrTypeTo = (arr, type) => {
  return (arr.includes(type.toLowerCase()) ? `${type} in` : `${type} to`);
};


export const closeElement = {
  isEscapeEvent: (evt, action) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      action();
    }
  },
};
