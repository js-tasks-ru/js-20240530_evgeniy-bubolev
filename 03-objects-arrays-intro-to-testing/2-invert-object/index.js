/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (obj === null || obj === undefined) {
    return;
  }

  const clone = {};
  Object.entries(obj).forEach(entry => {
    clone[entry[1]] = entry[0];
  });
  return clone;
}
