'use strict'

exports.main = function (inputString) {
  let logOutput = ''
  if (!this.checkInputValidity(inputString)) {
    throw new Error('user input is invalid')
  }
  const dataMap = this._parseInputStringToMap(inputString)
  for (const exercise in dataMap) {
    logOutput += exercise + '\n'
    const data = dataMap[exercise]
    for (const volume of data) {
      logOutput += '\t' + volume[0].toString() + 'x' + volume[1].toString() + ' @' + volume[2].toString() + '\n'
    }
  }
  logOutput += '\nTonnage:\n'
  for (const exercise in dataMap) {
    const exerciseNameArray = exercise.split(/\s+/)
    const tonnage = this._calcTonnage(dataMap[exercise])
    let exerciseName = ''
    for (const index in exerciseNameArray) {
      if (!exerciseNameArray[index].match(/[A-Z][0-9]+/)) {
        if (index >= exerciseNameArray.length - 1) {
          exerciseName = exerciseName + exerciseNameArray[index] + ': ' + tonnage
        } else {
          exerciseName = exerciseName + exerciseNameArray[index] + ' '
        }
      }
    }
    logOutput += exerciseName + '\n'
  }
  return logOutput
}

exports.checkInputValidity = function (string) {
  return true
}

exports._calcTonnage = function (arrayOfIntArrays) {
  let tonnage = 0
  for (const intArray of arrayOfIntArrays) {
    let tempTonnage = 1
    for (const value of intArray) {
      tempTonnage *= value
    }
    tonnage += tempTonnage
  }
  return tonnage
}

exports._parseSetDataToIntArray = function (volumeString) {
  const validDataArray = volumeString.split(/@/)
  const volumeIntArray = [0, 0, 0]
  for (const data of validDataArray) {
    if (data.match(/^[0-9]+x[0-9]+$/)) {
      const setRepArray = data.split(/x/)
      volumeIntArray[0] = parseInt(setRepArray[0], 10)
      volumeIntArray[1] = parseInt(setRepArray[1], 10)
    } else if (data.match(/^[0-9]+$/)) {
      volumeIntArray[2] = parseInt(data, 10)
    }
  }
  return volumeIntArray
}

exports._parseInputStringToMap = function (inputString) {
  var dataMap = new Map()
  var tempkey
  const inputStringWithSingleNewlines = inputString.replace(/\n+/g, '\n')
  const dataArray = inputStringWithSingleNewlines.split('\n')
  for (const line of dataArray) {
    if (this._isExerciseName(line)) {
      tempkey = line
      dataMap[tempkey] = []
    } else if (this._isSetData(line)) {
      const dataString = line.replace(/\s+/g, '')
      const dataIntArray = this._parseSetDataToIntArray(dataString)
      dataMap[tempkey].push(dataIntArray)
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
