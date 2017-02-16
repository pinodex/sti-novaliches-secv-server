'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Position = use('App/Model/Position'),
      Candidate = use('App/Model/Candidate'),
      Setting = use('App/Model/Setting'),
      Vote = use('App/Model/Vote'),
      Helpers = use('Helpers'),
      fs = require('fs')

class Result {
  static get alphabet () {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  }

  static * get (anonymous = true) {
    let showNames = yield Setting.find('show_names')

    if (showNames != null && showNames.value == 'true') {
      anonymous = false
    }

    const data = []
    const positions = yield Position.query()
      .with('candidates', 'candidates.votes')
      .orderBy('order')
      .fetch()

    positions.values().each(function (position) {
      const candidates = []
      let totalVotes = 0

      if (!(position.relations.candidates instanceof Array)) {
        position.relations.candidates.values().each(function (candidate, i) {
          if (!(candidate.relations.votes instanceof Array)) {
            totalVotes += candidate.relations.votes.size()
          }
        })

        position.relations.candidates.values().each(function (candidate, i) {
          const entry = {
            name: candidate.name,
            photo: null,
            votes: 0,
            percentage: 0
          }

          if (anonymous) {
            entry.name = `Candidate ${Result.alphabet[i]}`
          }

          if (!(candidate.relations.votes instanceof Array)) {
            entry.votes = candidate.relations.votes.size()
          }

          if (entry.votes > 0 && totalVotes > 0) {
            entry.percentage = ((entry.votes / totalVotes) * 100).toFixed(1)
          }

          if (!anonymous) {
            const photoPath = Helpers.storagePath(`uploads/${candidate.photo}`)

            if (candidate.photo != null && fs.existsSync(photoPath)) {
              entry.photo = fs.readFileSync(photoPath)
            }
          }

          candidates.push(entry)
        })
      }

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
