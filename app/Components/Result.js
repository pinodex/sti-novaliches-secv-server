'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Position = use('App/Model/Position')
const Candidate = use('App/Model/Candidate')
const Vote = use('App/Model/Vote')

class Result {
  static get alphabet () {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  }

  static * get () {
    const data = []
    const positions = yield Position.query()
      .with('candidates', 'candidates.votes')
      .orderBy('order')
      .fetch()

    positions.values().each(function (position) {
      const candidates = []
      let totalVotes = 0

      position.relations.candidates.values().each(function (candidate, i) {
        if (!(candidate.relations.votes instanceof Array)) {
          totalVotes += candidate.relations.votes.size()
        }
      })

      position.relations.candidates.values().each(function (candidate, i) {
        let votes = 0
        let percentage = 0

        if (!(candidate.relations.votes instanceof Array)) {
          votes = candidate.relations.votes.size()
        }

        if (votes > 0 && totalVotes > 0) {
          percentage = ((votes / totalVotes) * 100).toFixed(2)
        }

        candidates.push({
          name: `Candidate ${Result.alphabet[i]}`,
          votes: votes,
          percentage: percentage
        })
      })

      const entry = {
        position: {
          id: position.id,
          name: position.name
        },

        candidates: candidates
      }

      data.push(entry)
    })

    return data
  }
}

module.exports = Result
