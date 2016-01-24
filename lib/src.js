'use strict'

/*
Design

Input:
  A1. Squat
  1x5 @225
  2x3 @255
  2x2 @285
  B1. Clean
  1x5 @115
  2x3 @135
  2x2 @145

Parse
- separate into map
- where key is exercise name
- where value is an array of setrepweight

*/

exports.parseInputStringToMap = function (inputString) {
  var dataMap = {}
  var tempkey
  const dataArray = inputString.split('\n')
  if (this._isExerciseName(dataArray[0])) {
    for (const line of dataArray) {
      if (this._isExerciseName(line)) {
        tempkey = line
        dataMap[tempkey] = []
      } else if (this._isSetData(line)) {
        dataMap[tempkey].push(line)
      }
    }
  }
  return dataMap
}

exports._isExerciseName = function (name) {
  if (name.match(/^\s*[A-Z0-9a-z]+\.\s*.+$/)) {
    return true
  } else {
    return false
  }
}

exports._isSetData = function (string) {
  if (string.match(/^\s*([ivx]+\.\s*)?[0-9]+\s*x\s*[0-9]+\s*@\s*[0-9]+\s*$/)) {
    return true
  } else {
    return false
  }
}
