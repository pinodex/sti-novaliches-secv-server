'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Result = use('App/Components/Result')

class ResultsController {
  * index (request, response) {
    const results = yield Result.get(false)

    yield response.sendView('dashboard/results/index', {
      results: results
    })
  }
}

module.exports = ResultsController
