'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Student = use('App/Model/Student'),
      StudentFlag = use('App/Model/StudentFlag'),
      Vote = use('App/Model/Vote')

const _ = require('lodash')

class StatsController {
  * index (request, response) {
    const totalStudents = (yield Student.query().count('* as count').first()).count,
          studentsVoted = (yield StudentFlag.query().where('can_vote', '0').count('* as count').first()).count

    yield response.sendView('dashboard/stats/index', {
      totalStudents: totalStudents,
      studentsVoted: studentsVoted
    })
  }

  * all (request, response) {
    const totalStudents = (yield Student.query().count('* as count').first()).count,
          studentsVoted = (yield StudentFlag.query().where('can_vote', '0').count('* as count').first()).count

    let votes = (yield Vote.query().with('student', 'candidate', 'candidate.position').fetch()).toJSON()

    votes = _.groupBy(votes, 'student_id')
    votes = _.map(votes, function (entry) {
      let newEntry = {
        student: null,
        candidates: []
      }

      newEntry.student = entry[0].student

      for (let i in entry) {
        newEntry.candidates.push(entry[i].candidate)
      }

      newEntry.candidates = _.orderBy(newEntry.candidates, ['position_id'])

      return newEntry
    })

    yield response.sendView('dashboard/stats/all', {
      totalStudents: totalStudents,
      studentsVoted: studentsVoted,
      votes: votes
    })
  }
}

module.exports = StatsController
