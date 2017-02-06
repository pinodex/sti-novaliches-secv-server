'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Lucid = use('Lucid')

class Position extends Lucid {
  candidates () {
    return this.hasMany('App/Model/Candidate')
  }

  static get createTimestamp () {
    return null
  }

  static get updateTimestamp () {
    return null
  }

  static get deleteTimestamp () {
    return 'deleted_at'
  }
}

module.exports = Position
