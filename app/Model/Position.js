'use strict'

const Lucid = use('Lucid')

class Position extends Lucid {
  candidates() {
    return this.hasMany('App/Model/Candidate')
  }
}

module.exports = Position
