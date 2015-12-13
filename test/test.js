/* eslint-disable func-names */

var assert = require('chai').assert;
var Exer = require('../lib/exer');
var Loggen = require('../lib/loggen');

describe('[Exer]', function () {
  describe('constructor', function () {
    it('sets name', function () {
      var exercise = new Exer('A. Push Press');
      assert.equal(exercise.name, 'A. Push Press');
    });
    it('initializes data/tonnage', function () {
      var exercise = new Exer('A. Push Press');
      assert.lengthOf(exercise.data, 0);
      assert.equal(exercise.tonnage, 0);
    });
  });
  describe('addData()', function () {
    it('addData() sets data/tonnage', function () {
      var exercise = new Exer("A. Push Press");
      exercise.addData('5x5 @95');
      assert.lengthOf(exercise.data, 1);
      assert.equal(exercise.data[0], '5x5 @95');
      assert.equal(exercise.tonnage, 2375);
    });
  });
});

describe('[Loggen]', function () {
  it('initializes 1 item', function () {
    var log = new Loggen('A. Push Press\n5x5 @95');
    assert.equal(log.exerList.length, 3);
  });
});
