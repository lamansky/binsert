# binsert

Uses [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) to insert a value into any sorted collection.

## Installation

Requires [Node.js](https://nodejs.org/) 8.3.0 or above.

```bash
npm i binsert
```

## API

The module exports a single function.

### Parameters

1. Object argument:
    * Optional: `compare` (function, array, or any):
        * If a function: When passed two arguments `a` and `b`, expected to return `-1` if `a` is less than `b`, `1` if `a` is greater than `b`, and `0` if they are equal.
        * If an array: An array of Map/object keys, the values of which can be used to compare two Maps/objects. The first key is checked first, and if the two values for that key are equal, the next key in the array is checked, and so on. If any given element is itself an array, it is interpreted as a nested keychain.
        * Otherwise: A single Map/object key.
        * If omitted: Will compare numbers and strings. Will coerce everything else into strings.
    * `get` (function): A callback that should return a value for a given index from `0` to `length - 1`.
    * Optional: `insert` (function): A callback that accepts the index at which `value` should be inserted. The callback is not expected to return anything. If `insert` is omitted, it is assumed you will take care of insertion later using the `index` return value.
    * `length` (positive integer): The length of the collection.
    * Optional: `multiple` (string): Only applies if `unique` is `false` or undefined. Specifies behavior in the event that more than one existing collection item is sort-equivalent with `value`. If set to `first` or `last`, then `value` will be inserted before/after the first/last sort-equivalent item, respectively. (This will slow down the insert operation.) Otherwise, `value` will be inserted anywhere in the range of sort-equivalent items.
    * Optional: `set` (function): A callback that accepts the index at which an existing value should be overwritten with `value`. This only applies if `unique` is `true`. The callback is not expected to return anything.
    * Optional: `unique` (bool): If set to `true`, then no item in the collection may be sort-equivalent with another; so if an existing item is sort-equivalent with `value`, it will either be overwritten with the `set` callback (if one is provided) or else nothing will happen (if `set` is not specified). If set to `false`, multiple sort-equivalent items are allowed, so `value` will always be inserted. Defaults to `false`.
    * `value` (any): The value to insert.

### Return Value

Returns an object:

* `found` (boolean): `true` if `compare` reported that the collection already contained a value with the same sort value as `value`; `false` otherwise.
* `index` (positive integer): The index at which `value` was (or should be) inserted.

## Example

```javascript
const binsert = require('binsert')

const arr = ['a', 'c', 'e']
binsert({get: i => arr[i], insert: (i, v) => { arr.splice(i, 0, v) }, length: arr.length, value: 'b'}) // {found: false,  index: 1}
arr // ['a', 'b', 'c', 'e']
```

## Related

This module is part of the “b” family of binary search modules.

* [barr](https://github.com/lamansky/barr)
* [bfind](https://github.com/lamansky/bfind)
