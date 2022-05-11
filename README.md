# makeStruct

**MakeStruct** is a lightweight fast **dynamic constructor generator** for JavaScript.

The aim of makeStruct is to easily generate objects with dynamic properties on the fly.

### concept

A struct is used for building data structures. These structures or records are used to group related data together.

<hr />

## installation

To install with npm:

```
npm i makestruct
```

<hr />

# Reference

### makeStruct( 'keys' ) : Constructor

```js
let myModel = 'example,foo, baz, the lazy fox jumps, over the, rainbow';
const MyDynamicClass = new makeStruct(myModel);
const myDynamicObject = new MyDynamicClass();

Object.keys(myDynamicObject); // ["example","foo","baz","theLazyFoxJumps","overThe","rainbow", ... methods]
```

Constructor definition:

```js
/**
 * @constructor Generates a constructor for a given data structure
 * @param {string} keys comma separated.
 * @returns {constructor} Constructor for the new struct
 */
```

## methods

### propagateArray( Array ) : void

Populates a key-value array into the Object instance properties.

```js
const myData = [
  ['id', 1],
  ['name', 'John'],
  ['email', 'john@doe.com'],
];
const MyDynamicClass = new makeStruct('id, name, email');
const myDynamicObject = new MyDynamicClass();

myDynamicObject.propagateArray(myData);
// myDynamicObject { id: 1, name: 'John', email: 'john@doe.com' }
```

### propagateObject( Object ) : void

Populates an Object into the Object instance properties.

```js
const myData = {
  id: 1,
  name: 'John',
  email: 'john@doe.com',
};
const MyDynamicClass = new makeStruct('id, name, email');
const myDynamicObject = new MyDynamicClass();

myDynamicObject.propagateObject(myData);
// myDynamicObject { id: 1, name: 'John', email: 'john@doe.com' }
```

### hasKey( 'key' ) : boolean

```js
myDynamicObject.hasKey('name'); // true
myDynamicObject.hasKey('nome'); // false
```

### hasValue( 'value' ) : boolean

```js
myDynamicObject.hasValue('John'); // true
myDynamicObject.hasValue('Johnny'); // false
```

### toArray() : Array

```js
myDynamicObject.toArray(); // [['id', 1], ['name', 'John'], ['email', 'john@doe.com']]
```

## Overview:

```js
const Dog = new makeStruct('id, name, breed');
// Dog -> Function, constructor()
const myDog = new Dog(1, 'baxter', 'New Scotland Retriever');
myDog; // { id: 1, name: 'baxter', breed: 'New Scotland Retriever' }

myDog.id; // returns 1
myDog.name; // returns 'baxter'
myDog.breed; // returns 'New Scotland Retriever'
```

### Type information about the example above

```js
typeof myDog.id; // 'number'
typeof myDog.breed; // 'string'
typeof myDog; // 'object'
myDog instanceof Dog; // true
Dog.prototype.isPrototypeOf(myDog); // true
```

<hr />

## importing

```js
// in a module (like in a React component)
import makeStruct from 'makestruct';
// outside module (like in Node JS)
const makestruct = require('makestruct');
```

### Define some structure:

```js
const User = new makeStruct('id, name, country');
```

### Instantiate your new structure

```js
const foo = new User(1, 'John', 'UK');
```

Access the struct properties

```js
foo.id; // 1
foo.name; // 'john'
foo.country; // 'UK'
```

## Struct inside a struct

```js
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

```js
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

TypeScript example:

```ts
type Dog = {
  id: number;
  name: string;
  breed: string;
};

const LeDog = new makeStruct('id, name, breed');
const myDog: Dog = new LeDog(1, 'baxter', 'Retriever');

myDog.id.includes(); // Property 'includes' does not exist on type 'number'.ts(2339)
```

## Dynamically creating structures from a third party Object

```js
const myAPIResponse = {
  id: 1,
  name: 'John',
  userInfo: {
    city: 'NY',
    phone: '555-666-777',
  },
  pets: ['Baxter', 'Flurfils'],
};

const MyDynamicClass = new makeStruct(Object.keys(myAPIResponse).toString());
const myDynamicObject = new MyDynamicClass();

myDynamicObject.propagate(myAPIResponse);

myDynamicObject.name; // 'John'
myDynamicObject.pets; // ['Baxter', 'Flurfils']
myDynamicObject.userInfo; // { city: 'NY', phone: '555-666-777'}
```

# Changelog

- Added support for dynamically create structures from a third party Object

# Project Status

- The project is provided as is without warranties of any kind.
- I may add d.ts in future updates but ts-pragma along with JSDoc should suffice to export types for the constructor that returns a constructor. You'll need to define your own types for the objects you create with **makeStruct** either way.
- If you face any problem feel free to open a new issue and I'll try to look at it asap.
- Same applies for any pull request. The project is open source and It's maintained through collaborators or by my own.
