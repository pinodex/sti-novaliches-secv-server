'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Position = use('App/Model/Position')

class Result {
  static * get () {
    const data = []
    const positions = yield Position.query()
      .with('candidates', 'candidates.votes')
      .fetch()

    positions.each(position => {
      const candidates = []
      let totalVotes = 0

      position.relations.candidates.each(candidate => {
        totalVotes += candidate.relations.votes.size()
      })

      position.relations.candidates.each(candidate => {
        const votes = candidate.relations.votes.size()

        candidates.push({
          votes: votes,
          percentage: (votes / totalVotes) * 100
        })
      })

      data.push({
        name: position.name,
        candidates: candidates
      })
    })

    return data
  }
}

module.exports = Result
