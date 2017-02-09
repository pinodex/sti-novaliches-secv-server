'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Result = use('App/Components/Result')

class MainController {
  * index (request, response) {
    const r = yield Result.get()

    console.log(r)

    yield response.sendView('dashboard/index')
  }

  * login (request, response) {
    if (request.method() == 'POST') {
      try {
        const auth = yield request.auth.attempt(
          request.input('username'),
          request.input('password')
        )
      } catch (e) {
        yield request.withOut('password').andWith({ error: 'Invalid username and/or password' }).flash()

        response.route('dashboard.login')
        return
      }

      response.route('dashboard.index')
      return
    }

    yield response.sendView('dashboard/login')
  }

  * logout (request, response) {
    yield request.auth.logout()

    response.route('dashboard.login')
  }
}

module.exports = MainController
