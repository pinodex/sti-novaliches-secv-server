'use strict'

const Lucid = use('Lucid')

class Candidate extends Lucid {
  position () {
    return this.belongsTo('App/Model/Position')
  }
}

module.exports = Candidate
