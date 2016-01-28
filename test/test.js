/* eslint-disable func-names */

const assert = require('chai').assert
const src = require('../lib/src')

describe('main', function () {
  it('', function () {
    const userInput = 'A1. Squat\n1x5 @225\n2x3 @255\n2x2 @285\nB1. Clean\n1x5 @115\n2x3 @135\n2x2 @145'
    var output = src.main(userInput)
    console.log(output)
  })
})

describe('_calcTonnage', function () {
  it('', function () {
    const squatArray = [[1, 5, 225], [2, 3, 255], [2, 2, 285]]
    const expectedTonnage = 1 * 5 * 225 + 2 * 3 * 255 + 2 * 2 * 285
    assert.equal(src._calcTonnage(squatArray), expectedTonnage)
  })
})

describe('_parseSetDataToIntArray', function () {
  it('parses valid input', function () {
    const result = src._parseSetDataToIntArray('2x2@135')
    assert.equal(result[0], 2)
    assert.equal(result[1], 2)
    assert.equal(result[2], 135)
  })
})

describe('_parseInputStringToMap', function () {
  it('removes extra whitespace from set data', function () {
    const result = src._parseInputStringToMap('A1. Squat\n\n\n\n1   x	5 @  225\n\n		2x  3 @255\n   2x2 @285')
    const squatArray = [[1, 5, 225], [2, 3, 255], [2, 2, 285]]
    assert.isTrue('A1. Squat' in result)
    assert.isTrue(arraysAreEqual(result['A1. Squat'][0], squatArray[0]))
    assert.isTrue(arraysAreEqual(result['A1. Squat'][1], squatArray[1]))
    assert.isTrue(arraysAreEqual(result['A1. Squat'][2], squatArray[2]))
  })
  it('parses lots of data', function () {
    const result = src._parseInputStringToMap('A1. Squat\n1x5 @225\n2x3 @255\n2x2 @285\nB1. Clean\n1x5 @115\n2x3 @135\n2x2 @145')
    const squatArray = [[1, 5, 225], [2, 3, 255], [2, 2, 285]]
    const cleanArray = [[1, 5, 115], [2, 3, 135], [2, 2, 145]]
    assert.isTrue('A1. Squat' in result)
    assert.isTrue(arraysAreEqual(result['A1. Squat'][0], squatArray[0]))
    assert.isTrue(arraysAreEqual(result['A1. Squat'][1], squatArray[1]))
    assert.isTrue(arraysAreEqual(result['A1. Squat'][2], squatArray[2]))
    assert.isTrue('B1. Clean' in result)
    assert.isTrue(arraysAreEqual(result['B1. Clean'][0], cleanArray[0]))
    assert.isTrue(arraysAreEqual(result['B1. Clean'][1], cleanArray[1]))
    assert.isTrue(arraysAreEqual(result['B1. Clean'][2], cleanArray[2]))
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

// source: http://stackoverflow.com/questions/22395357/how-to-compare-two-arrays-are-equal-using-javascript-or-jquery
function arraysAreEqual (array1, array2) {
  return (array1.length === array2.length) && array1.every(function (element, index) {
    return element === array2[index]
  })
}
