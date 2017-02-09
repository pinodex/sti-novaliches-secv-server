'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

class Auth {

  * handle (request, response, next, rolesString) {
    const isLoggedIn = yield request.auth.check()

    if (!isLoggedIn) {
      response.route('dashboard.login')

      return
    }

    if (rolesString) {
      const roles = rolesString.split(',')
      
      if (roles.indexOf(request.auth.user.role) === -1) {
        yield response.status(401).sendView('errors/unauthorized')

        return
      }
    }

    yield next
  }

}

module.exports = Auth
