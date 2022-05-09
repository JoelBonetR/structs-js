// @ts-check
/**
 * @constructor Generates a constructor for a given data structure
 * @param {string} keys separated by a comma + whitespace. makeStruct('id, name, age')
 * @returns {constructor} Constructor for the new struct
 */
module.exports = function makeStruct(keys) {
  if (!keys || typeof keys !== 'string')
    throw new Error('makeStruct: @param should be a valid string. Check the reference at https://www.npmjs.com/package/makestruct');

  const k = keys.split(', ');

  /** @constructor */
  function constructor() {
    for (let i = 0; i < k.length; i++) this[k[i]] = arguments[i];
  }
  return constructor;
};
