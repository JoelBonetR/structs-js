// @ts-check
/**
 * @constructor Generates a constructor for a given data structure
 * @param {string} keys separated by a comma. makeStruct('id, name, age') | makeStruct('id,name,age')
 * @returns {constructor|Function} Constructor for the new struct
 */
module.exports = function makeStruct(keys) {
  if (!keys || typeof keys !== 'string')
    throw new Error('makeStruct: @param should be a valid string. Check the reference at https://www.npmjs.com/package/makestruct');

  const k = keys.split(',').map((i) =>
    i
      .trim()
      .split(' ')
      .map((p, i) => (i > 0 ? `${p.charAt(0).toUpperCase()}${p.substring(1)}` : p))
      .join('')
  );

  /** @constructor */
  function constructor() {
    for (let i = 0; i < k.length; i++) this[k[i]] = arguments[i];

    /** @param {Array} data */
    this['propagateArray'] = (data) => {
      if (data instanceof Array && Array.isArray(data)) {
        if (Array.isArray(data[0])) {
          data.forEach((value, i) => {
            this[value[0]] = value[1];
          });
        } else {
          throw new Error(
            `makeStruct:propagateArray @param - Expected key-value Array. [['key', 'value'], ['key2', 'value2']] but got ${data} instead`
          );
        }
      } else throw new Error(`makeStruct:propagateArray - @param must be an Array, got ${typeof data}`);
    };

    /** @param {Object} data */
    this['propagateObject'] = (data) => {
      if (data instanceof Object) {
        Object.values(data).forEach((value, i) => {
          this[Object.keys(data)[i]] = value;
        });
      } else throw new Error('makeStruct:propagateObject - @param must be a valid Object');
    };

    /**
     * @param {any} needle
     * @returns {Boolean}
     * */
    this['hasKey'] = (needle) => {
      const { propagateArray, propagateObject, hasKey, hasValue, ...props } = this;
      return Object.keys(props).includes(needle);
    };

    /**
     * @param {any} needle
     * @returns {Boolean}
     * */
    this['hasValue'] = (needle) => {
      const { propagateArray, propagateObject, hasKey, hasValue, ...props } = this;
      return Object.values(props).includes(needle);
    };
    /** @returns {Array<any>} */
    this['toArray'] = () => {
      const { propagateArray, propagateObject, hasKey, hasValue, toArray, ...props } = this;
      return Object.entries(props);
    };
  }

  return constructor;
};
