'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Client
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Lucid = use('Lucid')

class Position extends Lucid {
  candidates () {
    return this.hasMany('App/Model/Candidate')
  }
}

module.exports = Position
