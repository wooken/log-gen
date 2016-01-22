/* eslint-disable func-names */

const assert = require('chai').assert
const src = require('../lib/src')

describe('_isExerciseName', function () {
  it('accepts valid name', function () {
    assert.isTrue(src._isExerciseName('A. Push Press'))
  })
})
