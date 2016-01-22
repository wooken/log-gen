'use strict'

const Exer = require('../lib/exer')

class Loggen {
  constructor (input) {
    this.exerList = []
    this.input = input.replace(/\n+/g, '\n')
    this.parsed = this.input.split('\n')

    for (let i = 0; i < this.parsed.length; i++) {
      // TODO: need to strip roman numerals earlier before this check!
      if (this._isExerciseName(this.parsed[i])) {
        let exer = new Exer(this.parsed[i])
        let j = i + 1
        while (j < this.parsed.length && this._isSetData(this.parsed[j])) {
          exer.addData(this.parsed[j])
          j++
        }
        this.exerList.push(exer)
        console.log(exer)
      }
    }
  }

  _isExerciseName (name) {
    return name.match(/^\s*[A-Z0-9a-z]+\.\s*.+$/)
  }

  _isSetData (string) {
    return string.match(/^\s*([ivx]+\.\s*)?[0-9]+\s*x\s*[0-9]+\s*@\s*[0-9]+\s*$/)
  }
}

module.exports = Loggen
