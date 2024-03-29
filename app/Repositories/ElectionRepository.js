'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Position = use('App/Model/Position')
const Candidate = use('App/Model/Candidate')

class ElectionRepository {
  /**
   * Get all positions
   */
  static getPositions() {
    return Position.query().orderBy('order').fetch()
  }

  /**
   * Get all candidates
   */
  static getCandidates() {
    return Candidate.query().orderBy('name').fetch()
  }
}

module.exports = ElectionRepository
