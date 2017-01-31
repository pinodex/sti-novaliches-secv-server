'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Client
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

class VoteController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request

    this.responses = {
      'roster' : use('App/Ws/Responses/Roster')
    }
  }

  * onDataRequest (message) {
    if (this.responses.hasOwnProperty(message)) {
      let response = yield this.responses[message](this.socket, this.request)

      this.socket.toMe().emit('data:response:' + message, response)
    }
  }
}

module.exports = VoteController
