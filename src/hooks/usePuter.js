/**
 * Accesses the global `puter` object from the browser `window`.
 * @returns {any} The `window.puter` value, or `undefined` if it has not been set.
 */
export function usePuter() {
  return window.puter;
}