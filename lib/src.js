'use strict'

/*
Design

Input:
  A1. Squat
  1x5 @225
  2x3 @255
  2x2 @285

asdf

*/

exports._isExerciseName = function (name) {
  return name.match(/^\s*[A-Z0-9a-z]+\.\s*.+$/)
}

exports._isSetData = function (string) {
  return string.match(/^\s*([ivx]+\.\s*)?[0-9]+\s*x\s*[0-9]+\s*@\s*[0-9]+\s*$/)
}
