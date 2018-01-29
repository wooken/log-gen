(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mptlog = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.main = function (inputString) {
  var logOutput = '';
  if (!this.checkInputValidity(inputString)) {
    throw new Error('user input is invalid');
  }
  var dataMap = this._parseInputStringToMap(inputString);
  for (var exercise in dataMap) {
    logOutput += exercise + '\n';
    var data = dataMap[exercise];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var volume = _step.value;

        logOutput += '\t' + volume[0].toString() + 'x' + volume[1].toString() + ' @' + volume[2].toString() + '\n';
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  var total_tonnage = 0;
  logOutput += '\nTonnage:\n';
  for (var _exercise in dataMap) {
    var exerciseNameArray = _exercise.split(/\s+/);
    var tonnage = this._calcTonnage(dataMap[_exercise]);
    total_tonnage += tonnage;
    var exerciseName = '';
    for (var index in exerciseNameArray) {
      if (!exerciseNameArray[index].match(/[A-Z][0-9]+/)) {
        if (index >= exerciseNameArray.length - 1) {
          exerciseName = exerciseName + exerciseNameArray[index] + ': ' + tonnage;
        } else {
          exerciseName = exerciseName + exerciseNameArray[index] + ' ';
        }
      }
    }
    logOutput += exerciseName + '\n';
  }
  logOutput += 'Total: ' + total_tonnage;
  return logOutput;
};

exports.checkInputValidity = function (string) {
  return true;
};

exports._calcTonnage = function (arrayOfIntArrays) {
  var tonnage = 0;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = arrayOfIntArrays[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var intArray = _step2.value;

      var tempTonnage = 1;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = intArray[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var value = _step3.value;

          tempTonnage *= value;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      tonnage += tempTonnage;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return tonnage;
};

exports._parseSetDataToIntArray = function (volumeString) {
  var validDataArray = volumeString.split(/@/);
  var volumeIntArray = [0, 0, 0];
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = validDataArray[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var data = _step4.value;

      if (data.match(/^[0-9]+x[0-9]+$/)) {
        var setRepArray = data.split(/x/);
        volumeIntArray[0] = parseInt(setRepArray[0], 10);
        volumeIntArray[1] = parseInt(setRepArray[1], 10);
      } else if (data.match(/^[0-9]+$/)) {
        volumeIntArray[2] = parseInt(data, 10);
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return volumeIntArray;
};

exports._parseInputStringToMap = function (inputString) {
  var dataMap = new Map();
  var tempkey;
  var inputStringWithSingleNewlines = inputString.replace(/\n+/g, '\n');
  var dataArray = inputStringWithSingleNewlines.split('\n');
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = dataArray[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var line = _step5.value;

      if (this._isExerciseName(line)) {
        tempkey = line.trim();
        dataMap[tempkey] = [];
      } else if (this._isSetData(line)) {
        var dataString = line.replace(/\s+/g, '');
        var dataIntArray = this._parseSetDataToIntArray(dataString);
        dataMap[tempkey].push(dataIntArray);
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return dataMap;
};

exports._isExerciseName = function (name) {
  if (name.match(/^\s*[A-Z]+[0-9]*\.\s*([A-Za-z ])+\s*$/)) {
    return true;
  } else {
    return false;
  }
};

exports._isSetData = function (string) {
  if (string.match(/^\s*([ivx]+\.\s*)?[0-9]+\s*x\s*[0-9]+\s*@\s*[0-9]+\s*$/)) {
    return true;
  } else {
    return false;
  }
};
},{}]},{},[1])(1)
});