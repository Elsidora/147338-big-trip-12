export const renderHtmlElement = (container, markupString, position) => {
  container.insertAdjacentHTML(position, markupString);
};
