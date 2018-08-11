'use strict'

const bfind = require('bfind')

module.exports = function badd ({get, insert, length, multiple, unique, set, value, ...misc}) {
  if (unique) multiple = 'any'
  const r = bfind({...misc, get, length, multiple, value})

  if (r.found && unique) {
    if (set) set(r.index, value)
  } else {
    if (r.found && multiple === 'last') r.index++
    if (insert) insert(r.index, value)
  }

  return r
}
