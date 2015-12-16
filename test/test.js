/* eslint-disable func-names */

const assert = require('chai').assert;
const Exer = require('../lib/exer');
const Loggen = require('../lib/loggen');

describe('Exer', function () {
  describe('constructor', function () {
    it('sets name', function () {
      const exercise = new Exer('A. Push Press');
      assert.equal(exercise.name, 'A. Push Press');
    });
    it('initializes data/tonnage', function () {
      const exercise = new Exer('A. Push Press');
      assert.lengthOf(exercise.data, 0);
      assert.equal(exercise.tonnage, 0);
    });
  });
  describe('Exer.addData()', function () {
    it('sets data/tonnage', function () {
      const exercise = new Exer('A. Push Press');
      exercise.addData('5x5@95');
      assert.lengthOf(exercise.data, 1);
      assert.equal(exercise.data[0], '5x5@95');
      assert.equal(exercise.tonnage, 5 * 5 * 95);
    });
    it('sets multiple data/tonnage', function () {
      const exercise = new Exer('A. Push Press');
      exercise.addData('5x5@95');
      exercise.addData('5x5@95');
      exercise.addData('5x5@95');
      assert.lengthOf(exercise.data, 3);
      assert.equal(exercise.tonnage, 5 * 5 * 95 * 3);
    });
    it('ignores whitespace in data', function () {
      const exercise = new Exer('A. Push Press');
      exercise.addData('5x5@95');
      exercise.addData('5x5 @95');
      exercise.addData(' 5 x 5 @ 95 ');
      assert.lengthOf(exercise.data, 3);
      assert.equal(exercise.data[0], '5x5@95');
      assert.equal(exercise.data[1], '5x5@95');
      assert.equal(exercise.data[2], '5x5@95');
      assert.equal(exercise.tonnage, 5 * 5 * 95 * 3);
    });
  });
});

describe('[Loggen]', function () {
  it('initializes 1 item', function () {
    var log = new Loggen('A. Push Press\n5x5 @95');
    assert.equal(log.exerList.length, 3);
  });
});
