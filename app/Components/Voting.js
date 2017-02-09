'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Database = use('Database'),
      StudentToken = use('App/Model/StudentToken'),
      Vote = use('App/Model/Vote')

class Voting {
  constructor (token) {
    this.token = token
    this.student = null
    this.votes = []
  }

  * checkEligibility () {
    const token = yield StudentToken.query()
      .with('student', 'student.flag')
      .whereNotNull('value')
      .where('value', this.token)
      .first()

    if (token == null) {
      return false
    }

    if (token.relations.student == null) {
      return false
    }

    if (token.relations.student.relations.flag == null) {
      return false
    }

    if (token.relations.student.relations.flag.can_vote == false) {
      return false
    }

    this.student = token.relations.student
    
    return true
  }

  addVote (candidateId) {
    this.votes.push(candidateId)
  }

  * commit () {
    if (this.student == null) {
      const eligible = yield this.checkEligibility()

      if (!eligible) {
        throw new Error('User ineligible for voting')
      }
    }

    yield Database.transaction(function * (transaction) {
      for (var i = 0; i < this.votes.length; i++) {
        const vote = new Vote()

        vote.student_id = this.student.id
        vote.candidate_id = this.votes[i]

        vote.useTransaction(transaction)
        yield vote.save()
      }

      this.student.relations.flag.can_vote = false
      yield this.student.relations.flag.save()
    }.bind(this))
  }
}

module.exports = Voting
