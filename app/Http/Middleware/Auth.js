'use strict'

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
