'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Client
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

class Auth {

  * handle (request, response, next) {
    const isLoggedIn = yield request.auth.check()

    if (!isLoggedIn) {
      response.route('dashboard.login')

      return
    }

    yield next
  }

}

module.exports = Auth
