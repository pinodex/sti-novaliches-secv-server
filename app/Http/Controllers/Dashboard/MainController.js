'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Client
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

class MainController {
  * index (request, response) {
    yield response.sendView('dashboard/index')
  }

  * getLogin (request, response) {
    yield response.sendView('dashboard/login')
  }

  * postLogin (request, response) {
    try {
      const auth = yield request.auth.attempt(
        request.input('username'),
        request.input('password')
      )
    } catch (e) {
      yield request
        .withOut('password')
        .andWith({
          error: 'Invalid username and/or password'
        })
        .flash()

      response.route('dashboard.login')

      return
    }

    response.route('dashboard.index')
  }

  * getLogout (request, response) {
    yield request.auth.logout()

    response.route('dashboard.login')
  }
}

module.exports = MainController
