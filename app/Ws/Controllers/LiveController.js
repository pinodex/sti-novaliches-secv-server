'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Result = use('App/Components/Result')

class LiveController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request
  }

  * onUpdate () {
    this.socket.toMe().emit('update', yield Result.get())
  }
}

module.exports = LiveController
