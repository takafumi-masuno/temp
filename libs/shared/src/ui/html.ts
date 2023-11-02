/**
 * @param element 要素
 * @returns 要素の全部がViewportに入ったかどうか
 */
export function isElementInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * @param element 要素
 * @returns 要素の一部がViewportに入ったかどうか
 */
export function isAnyPartOfElementInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

  return vertInView && horInView;
}

/**
 * @param element 要素
 * @returns 要素の一部がViewportより上かどうか
 */
export function isAnyPartOfElementAboveViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = rect.top <= windowHeight;
  const horInView = rect.left <= windowWidth;

  return vertInView && horInView;
}

export const isOverflown = ({
  clientWidth,
  clientHeight,
  scrollWidth,
  scrollHeight,
}) => scrollHeight > clientHeight || scrollWidth > clientWidth;

export function getOffset(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();

  return {
    top: rect.top - bodyRect.top,
    left: rect.left - bodyRect.left,
  };
}
