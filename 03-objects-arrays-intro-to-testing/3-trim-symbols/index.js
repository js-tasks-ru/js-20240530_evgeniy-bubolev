/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return '';
  }

  if (size === null || size === undefined) {
    return string;
  }

  let result = '';
  let previousCharacter = '';
  let previousCharacterCounter = 0;

  for (const char of string) {

    if (previousCharacterCounter >= size && char === previousCharacter) {
      continue;
    }

    if (char === previousCharacter) {
      previousCharacterCounter++;
      if (previousCharacterCounter > size) {
        continue;
      } else {
        result += char;
      }
    } else {
      result += char;
      previousCharacter = char;
      previousCharacterCounter = 1;
    }
  }
  return result;
}
