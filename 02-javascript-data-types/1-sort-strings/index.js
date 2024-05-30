/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param) {
  if (param === 'desc') {
    return arr
      .slice()
      .sort((a, b) => {return b.localeCompare(a, ['ru', 'en'], {sensitivity: 'case', caseFirst: 'upper'});});
  } else {
    return arr
      .slice()
      .sort((a, b) => {return a.localeCompare(b, ['ru', 'en'], {sensitivity: 'case', caseFirst: 'upper'});});
  }
}
