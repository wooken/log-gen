'use strict'

const Exer = require('../lib/exer')

class Loggen {
  constructor (input) {
    this.exerList = []
    this.input = input.replace(/\n+/g, '\n')
    this.parsed = input.split('\n')
  }

  _isExerciseName (name) {
    return name.match(/^\s*[A-Z0-9]+\.\s*.+$"/)
  }
}

module.exports = Loggen
