/* eslint-disable func-names */

const assert = require('chai').assert
const Exer = require('../lib/exer')
const Loggen = require('../lib/loggen')

describe('Exer', function () {
  describe('constructor', function () {
    it('sets name', function () {
      const exercise = new Exer('A. Push Press')
      assert.equal(exercise.name, 'A. Push Press')
    })
    it('initializes data/tonnage', function () {
      const exercise = new Exer('A. Push Press')
      assert.lengthOf(exercise.data, 0)
      assert.equal(exercise.tonnage, 0)
    })
  })
  describe('Exer.addData()', function () {
    it('sets data/tonnage', function () {
      const exercise = new Exer('A. Push Press')
      exercise.addData('5x5@95')
      assert.lengthOf(exercise.data, 1)
      assert.equal(exercise.data[0], '5x5@95')
      assert.equal(exercise.tonnage, 5 * 5 * 95)
    })
    it('sets multiple data/tonnage', function () {
      const exercise = new Exer('A. Push Press')
      exercise.addData('5x5@95')
      exercise.addData('5x5@95')
      exercise.addData('5x5@95')
      assert.lengthOf(exercise.data, 3)
      assert.equal(exercise.tonnage, 5 * 5 * 95 * 3)
    })
    it('ignores whitespace in data', function () {
      const exercise = new Exer('A. Push Press')
      exercise.addData('5x5@95')
      exercise.addData('5x5 @95')
      exercise.addData(' 5 x 5 @ 95 ')
      assert.lengthOf(exercise.data, 3)
      assert.equal(exercise.data[0], '5x5@95')
      assert.equal(exercise.data[1], '5x5@95')
      assert.equal(exercise.data[2], '5x5@95')
      assert.equal(exercise.tonnage, 5 * 5 * 95 * 3)
    })
    it('removes roman numerals', function () {
      const exercise = new Exer('A. Push Press')
      exercise.addData('i. 5x5@95')
      assert.lengthOf(exercise.data, 1)
      assert.equal(exercise.data[0], '5x5@95')
    })
  })
})

describe('[Loggen]', function () {
  it('initializes 1 item', function () {
    const log = new Loggen('A. Push Press\n5x5 @95')
    assert.lengthOf(log.exerList, 1)
  })
  it('init 1 item multiple sets', function () {
    const log = new Loggen('A. Push Press\n5x5 @95\n5x5 @95')
    assert.lengthOf(log.exerList, 1)
    assert.lengthOf(log.exerList[0].data, 2)
  })
  it('init 2 items multiple sets', function () {
    const L = new Loggen('A. Push Press\n5x5 @95\n5x5 @95\nB. Squat\n3x3 @135\n2x2 @155\n1x1 @185')
    assert.lengthOf(L.exerList, 2)
    assert.lengthOf(L.exerList[0].data, 2)
    assert.lengthOf(L.exerList[1].data, 3)
  })
  it('init extra newline whitespace', function () {
    const L = new Loggen('A. Push Press\n\n\n5x5 @95\n\n5x5 @95\nB. Squat\n3x3 @135\n2x2 @155\n1x1 @185')
    assert.lengthOf(L.exerList, 2)
    assert.lengthOf(L.exerList[0].data, 2)
    assert.lengthOf(L.exerList[1].data, 3)
  })
  it('init extra space whitespace', function () {
    const L = new Loggen('A. Push Press\n   5x5 @95   \n   5x5 @95\nB. Squat\n3x3 @135\n2x2 @155\n1x1 @185')
    assert.lengthOf(L.exerList, 2)
    assert.lengthOf(L.exerList[0].data, 2)
    assert.lengthOf(L.exerList[1].data, 3)
  })
  it('init variable whitespace', function () {
    const L = new Loggen('A. Power Clean\n\n i. 1x5 @105 \n\n 6x3 @115 \n\n 1x5 @105 \n\n C. Squat\n\n i. 1x5 @175 \n\n 2x2 @195 \n\n 1x5 @195 \n\n 2x5 @175 \n\n 1x5 @195 \n\n 2x3 @175')
    assert.lengthOf(L.exerList, 2)
    assert.lengthOf(L.exerList[0].data, 3)
    assert.lengthOf(L.exerList[1].data, 6)
  })
})

describe('isExerciseData()', function () {
  it.skip('accepts names', function () {
    const name = 'A. Push Press'
    assert.isTrue(Loggen.isExerciseName(name))
  })
  it.skip('rejects data', function () {
    const data = '4x5 @95'
    assert.isFalse(Loggen.isExerciseName(data))
  })
  it.skip('accepts special characters', function () {
    const name = 'A. Push Press \([\{-:!@#%^&*+'
    assert.isTrue(Loggen.isExerciseName(name))
  })
})
/*
    describe('isSetData()', function () {
        it('rejects names', function () {
            String name = 'A. Push Press'
            expect(isSetData(name), false)
        })
        it('accepts data with roman numerals', function () {
            String data = 'i. 4x5 @95'
            expect(isSetData(data), true)
        })
        it('accepts data without roman numerals', function () {
            String data = '4x5 @95'
            expect(isSetData(data), true)
        })
        it('ignores all whitespace (sanely)', function () {
            String data = '4 x5@ 95'
            expect(isSetData(data), true)
        })
    })
*/
