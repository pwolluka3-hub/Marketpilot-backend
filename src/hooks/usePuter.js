/**
 * Accesses the global `puter` object from the browser `window`.
 * @returns {any} The value of `window.puter`, or `undefined` if it is not defined.
 */
export function usePuter() {
  return window.puter;
}