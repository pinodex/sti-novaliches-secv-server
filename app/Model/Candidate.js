'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Lucid = use('Lucid')

class Candidate extends Lucid {
  position () {
    return this.belongsTo('App/Model/Position')
  }
}

module.exports = Candidate
