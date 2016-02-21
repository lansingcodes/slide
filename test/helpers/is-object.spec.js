/* global describe, it, expect */

import isObject from '../../src/helpers/is-object.js'

describe('helpers/is-object', () => {
  it('correctly identifies an empty object', () => {
    expect(isObject({})).toBe(true)
  })
  it('correctly identifies an empty array', () => {
    expect(isObject([])).toBe(false)
  })
  it('correctly identifies an empty string', () => {
    expect(isObject('')).toBe(false)
  })
  it('correctly identifies a number', () => {
    expect(isObject(1)).toBe(false)
  })
  it('correctly identifies NaN', () => {
    expect(isObject(NaN)).toBe(false)
  })
  it('correctly identifies undefined', () => {
    expect(isObject(undefined)).toBe(false)
  })
  it('correctly identifies null', () => {
    expect(isObject(null)).toBe(false)
  })
})
