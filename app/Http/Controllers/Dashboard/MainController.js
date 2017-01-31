'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Client
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

class MainController {
  * index (request, response) {
    response.send('ok')
  }

  * login (request, response) {
    yield response.sendView('dashboard/login')
  }
}

module.exports = MainController
