'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Student = use('App/Model/Student'),
      Result = use('App/Components/Result'),
      Voting = use('App/Components/Voting'),
      StudentWsAuth = use('App/Components/StudentWsAuth'),
      ElectionRepository = use('App/Repositories/ElectionRepository'),
      Helpers = use('Helpers')

const fs = require('fs')

class VoteController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request
  }

  * onGetRoster (message) {
    let positions = yield ElectionRepository.getPositions()
    let candidates = yield ElectionRepository.getCandidates()

    this.socket.toMe().emit('positions', positions.toJSON())

    candidates.each(candidate => {
      candidate = candidate.toJSON()

      const photoPath = Helpers.storagePath(`uploads/${candidate.photo}`)
      let photo = null

      if (candidate.photo != null && fs.existsSync(photoPath)) {
        photo = fs.readFileSync(photoPath)
      }

      candidate.photo = photo
      
      this.socket.toMe().emit('candidate', candidate)
    })

    this.socket.toMe().emit('done')
  }

  * onAuth (code) {
    try {
      const auth = yield StudentWsAuth.try(code)

      if (!auth.getFlags().can_vote) {
        this.socket.toMe().emit('auth:error', 'You can only vote once')
        return
      }

      this.socket.toMe().emit('auth', {
        token: yield auth.getToken(),
        user: auth.getUser()
      })
    } catch (e) {
      this.socket.toMe().emit('auth:error', e.message)
    }
  }

  * onCast (data) {
    const vote = new Voting(data.token)
    const isEligible = yield vote.checkEligibility()

    if (!isEligible) {
      this.socket.toMe().emit('auth:error', 'You are not eligible to vote')
      return
    }

    vote.setVotes(data.ballot)
    yield vote.commit()

    this.socket.toMe().emit('cast')
    this.socket.emit('update', yield Result.get())
  }

  * onGetUpdate () {
    this.socket.emit('update', yield Result.get())
  }
}

module.exports = VoteController
