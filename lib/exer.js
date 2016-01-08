'use strict'

class Exer {
  constructor (name) {
    this.name = name.trim()
    this.data = []
    this.tonnage = 0
  }

  _calcTonnage (volumeArray) {
    let tonnage = 1
    volumeArray.forEach(value => tonnage = tonnage * value)
    return tonnage
  }

  _extractIntegers (volumeString) {
    const volumeArray = volumeString.split(/\s/)
    let validVolumeData = ''
    for (const volume of volumeArray) {
      if (volume.match(/x/) || volume.match(/@/)) {
        validVolumeData = volume + validVolumeData
      }
    }
    const validDataArray = validVolumeData.split(/@/)
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

  addData (input) {
    input = input.replace(/\s+/g, '')
    if (input.match(/^[ivx]+\./)) {
      input = input.split('.')[1]
    }
    this.data.push(input)
    const volumeIntArray = this._extractIntegers(input)
    this.tonnage = this.tonnage + this._calcTonnage(volumeIntArray)
  }
}

module.exports = Exer
