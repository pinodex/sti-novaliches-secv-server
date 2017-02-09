'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Lucid = use('Lucid')

class Vote extends Lucid {
  student () {
    return this.belongsTo('App/Model/Student')
  }

  candidate () {
    return this.belongsTo('App/Model/Candidate')
  }

  static get updateTimestamp () {
    return null
  }
}

module.exports = Vote
