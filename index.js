// @ts-check

/**
 * @constructor Generates a constructor for a given data structure
 * @param {string} keys separated by a comma + whitespace. struct('id, name, age')
 * @returns {constructor} Constructor for the new struct
 */
export default function makeStruct(keys) {
  if (!keys) return null;
  const k = keys.split(', ');
  const count = k.length;

  /** @constructor */
  function constructor() {
    for (let i = 0; i < count; i++) this[k[i]] = arguments[i];
  }
  return constructor;
}
