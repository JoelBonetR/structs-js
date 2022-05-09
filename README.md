# makeStruct

A struct is used for building data structures. These structures or records are used to group related data together.

<hr />

## installation

To install with npm:

```
npm i makestruct
```

<hr />

# Reference

```javascript
/**
 * @param {string} keys separated by a comma + whitespace. makeStruct('id, name, age')
 * @returns {constructor} Constructor for the new struct
 */
makeStruct(keys);
```

<hr />

# Usage Examples

## importing

```javascript
// in a module (like in a React component)
import makeStruct from 'makestruct';
// outside module (like in Node JS)
const makestruct = require('makestruct');
```

### Define some structure:

```javascript
const User = new makeStruct('id, name, country');
```

### Instantiate your new structure

```javascript
const foo = new User(1, 'John', 'UK');
```

Access the struct properties

```javascript
foo.id; // 1
foo.name; // 'john'
foo.country; // 'UK'
```

## Struct inside a struct

```javascript
// Define a structure
const User = new makeStruct('id, name, country');
// Define another structure
const UserDetails = new makeStruct('phone, age, hairColor');
// Instantiate the inner struct first
const johnInfo = new UserDetails('555-777-888', 31, 'blonde');
// instantiate the parent struct passing the child struct as param
const john = new User(1, 'John', 'US', johnInfo);

// Accessing parent struct properties
john.id; // 1
john.name; // John
john.country; // 'US'

// Accessing child struct properties
john.info.phone; // '555-777-888'
john.info.age; // 31
john.info.hairColor; // 'blonde'
```

You can add structs into structs into other structs... just like a matroska.

The latest information I've relative to the maximum amount of keys in a JavaScript Object is around 8.3 million in V8 so that would be the limit approximately.

## TypeDefs

You can define your data structures in JavaScript with TS pragma and JSDoc like that:

```javascript
// @ts-check

/**
 * @typedef UserInfo
 * @property {string} phone
 * @property {number} age
 * @property {string} hairColor
 */

/** @type {ObjectConstructor|any} */
const UserInfo = new makeStruct('phone, age, hairColor');

/** @type {UserInfo} */
const extraInfo = new UserInfo('555-777-888', 31, 'blonde');
```

Typechecking will not happen while instantiating the UserInfo struct, but while accessing it.

Example:

```javascript
extraInfo.age.includes(); // Property 'includes' does not exist on type 'number'.ts(2339)
```

# Project Status

- The project is provided as is without warranties of any kind.
- If you face any problem feel free to open a new issue and I'll try to look at it asap.
- Same applies for any pull request. The project is open source and It's maintained through collaborators or by my own.
