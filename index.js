// @ts-check
/**
 * @constructor Generates a constructor for a given data structure
 * @param {string} keys separated by a comma + whitespace. makeStruct('id, name, age')
 * @returns {constructor} Constructor for the new struct
 */
module.exports = function makeStruct(keys) {
  if (!keys) return null;
  const k = keys.split(', ');

  /** @constructor */
  function constructor() {
    for (let i = 0; i < k.length; i++) this[k[i]] = arguments[i];
  }
  return constructor;
};
