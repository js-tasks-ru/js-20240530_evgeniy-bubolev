/**
 * omit - creates an object composed of enumerable property fieldsToFilter
 * @param {object} input - the source object
 * @param {...string} fieldsToFilter - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (input, ...fieldsToFilter) => {
  const result = {};

  for (const key in input) {
    let toOmit = false;
    fieldsToFilter.forEach(field => {
      if (key === field) {
        toOmit = true;
      }
    });

    if (!toOmit) {
      result[key] = input[key];
    }
  }

  return result;
};
