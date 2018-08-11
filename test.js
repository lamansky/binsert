'use strict'

const assert = require('assert')
const binsert = require('.')
const isArrayWith = require('is-array-with')

describe('binsert()', function () {
  it('should add a new item to the appropriate spot', function () {
    const arr = ['a', 'c', 'e']
    const {found, index} = binsert({
      get: i => arr[i],
      insert: (i, v) => { arr.splice(i, 0, v) },
      length: arr.length,
      value: 'b',
    })
    assert.strictEqual(found, false)
    assert.strictEqual(index, 1)
    assert(isArrayWith(arr, 'a', 'b', 'c', 'e'))
  })

  it('should add an item after all equivalent items if `multiple` is `last`', function () {
    {
      const arr = ['a', 'b', 'b', 'b', 'c']
      const {found, index} = binsert({
        get: i => arr[i],
        insert: (i, v) => { arr.splice(i, 0, v) },
        length: arr.length,
        multiple: 'last',
        value: 'b',
      })
      assert.strictEqual(found, true)
      assert.strictEqual(index, 4)
      assert(isArrayWith(arr, 'a', 'b', 'b', 'b', 'b', 'c'))
    }
    {
      const arr = ['b', 'b', 'b']
      const {found, index} = binsert({
        get: i => arr[i],
        insert: (i, v) => { arr.splice(i, 0, v) },
        length: arr.length,
        multiple: 'last',
        value: 'b',
      })
      assert.strictEqual(found, true)
      assert.strictEqual(index, 3)
      assert(isArrayWith(arr, 'b', 'b', 'b', 'b'))
    }
  })

  it('should add an item before all equivalent items if `insertBefore` is true', function () {
    {
      const arr = ['a', 'b', 'b', 'b', 'c']
      const {found, index} = binsert({
        get: i => arr[i],
        insert: (i, v) => { arr.splice(i, 0, v) },
        length: arr.length,
        multiple: 'first',
        value: 'b',
      })
      assert.strictEqual(found, true)
      assert.strictEqual(index, 1)
      assert(isArrayWith(arr, 'a', 'b', 'b', 'b', 'b', 'c'))
    }
    {
      const arr = ['a', 'b', 'c', 'd', 'd']
      const {found, index} = binsert({
        get: i => arr[i],
        insert: (i, v) => { arr.splice(i, 0, v) },
        insertBefore: true,
        length: arr.length,
        value: 'd',
      })
      assert.strictEqual(found, true)
      assert.strictEqual(index, 3)
      assert(isArrayWith(arr, 'a', 'b', 'c', 'd', 'd', 'd'))
    }
    {
      const arr = ['b', 'b', 'b']
      const {found, index} = binsert({
        get: i => arr[i],
        insert: (i, v) => { arr.splice(i, 0, v) },
        length: arr.length,
        multiple: 'first',
        value: 'b',
      })
      assert.strictEqual(found, true)
      assert.strictEqual(index, 0)
      assert(isArrayWith(arr, 'b', 'b', 'b', 'b'))
    }
  })
})
