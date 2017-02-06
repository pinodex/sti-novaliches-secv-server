'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const ElectionRepository = use('App/Repositories/ElectionRepository')

module.exports = function *(socket, request) {
  let positions = yield ElectionRepository.getPositions()
  let candidates = yield ElectionRepository.getCandidates()

  return {
    positions: positions,
    candidates: candidates
  }
}
