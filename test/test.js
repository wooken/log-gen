/* eslint-disable func-names */

const assert = require('chai').assert
const src = require('../lib/src')

describe('parseInputStringToMap', function () {
  it('removes extra whitespace from set data', function () {
    const result = src.parseInputStringToMap('A1. Squat\n\n\n\n1   x	5 @  225\n\n		2x  3 @255\n   2x2 @285')
    assert.isTrue('A1. Squat' in result)
    assert.equal(result['A1. Squat'][0], '1x5@225')
    assert.equal(result['A1. Squat'][1], '2x3@255')
    assert.equal(result['A1. Squat'][2], '2x2@285')
  })
  it('parses lots of data', function () {
    const result = src.parseInputStringToMap('A1. Squat\n1x5 @225\n2x3 @255\n2x2 @285\nB1. Clean\n1x5 @115\n2x3 @135\n2x2 @145')
    assert.isTrue('A1. Squat' in result)
    assert.equal(result['A1. Squat'][0], '1x5@225')
    assert.equal(result['A1. Squat'][1], '2x3@255')
    assert.equal(result['A1. Squat'][2], '2x2@285')
    assert.isTrue('B1. Clean' in result)
    assert.equal(result['B1. Clean'][0], '1x5@115')
    assert.equal(result['B1. Clean'][1], '2x3@135')
    assert.equal(result['B1. Clean'][2], '2x2@145')
  })
})

describe('_isExerciseName', function () {
  it('accepts valid name', function () {
    assert.isTrue(src._isExerciseName('A. Push Press'))
  })
  it('rejects invalid name', function () {
    assert.isFalse(src._isExerciseName('1x5 @225'))
  })
})

describe('_isSetData', function () {
  it('accepts valid name', function () {
    assert.isFalse(src._isSetData('A. Push Press'))
  })
  it('rejects invalid name', function () {
    assert.isTrue(src._isSetData('1x5 @225'))
  })
})
