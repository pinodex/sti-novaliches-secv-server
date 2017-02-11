'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Student = use('App/Model/Student'),
      StudentFlag = use('App/Model/StudentFlag')

class StatsController {
  * index (request, response) {
    const totalStudents = (yield Student.query().count('* as count').first()).count,
          studentsVoted = (yield StudentFlag.query().where('can_vote', '0').count('* as count').first()).count

    yield response.sendView('dashboard/stats/index', {
      totalStudents: totalStudents,
      studentsVoted: studentsVoted
    })
  }
}

module.exports = StatsController
