/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} propertyPath - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export function createGetter(propertyPath) {
  const pathParts = propertyPath.split('.');

  return (obj) => {
    let result = obj;

    for (const pathPart of pathParts) {
      if (!result.hasOwnProperty(pathPart)) {
        return;
      }

      result = result[pathPart];

    }
    return result;
  };
}
