'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Student = use('App/Model/Student')
const SecureRandom = use('App/Components/SecureRandom')

class StudentWsAuth {
  constructor (student) {
    this.student = student
  }

  getUser () {
    return this.student
  }

  getFlags () {
    return this.student.relations.flag.toJSON()
  }

  * getToken () {
    if (this.student.relations.token) {
      return this.student.relations.token.value
    }

    return yield this.generateToken()
  }

  * generateToken() {
    const token = SecureRandom.generateAlphanumeric(60)

    if (this.student.relations.token == null) {
      yield this.student.token().create({
        value: token
      })

      return token
    }

    this.student.relations.token.value = token
    yield this.student.relations.token.save()

    return token
  }

  * setupFlags () {
    if (this.student.relations.flag == null) {
      yield this.student.flag().create({
        can_vote: true
      })
    }
  }

  static * try (code) {
    const student = yield Student.query()
      .with('token', 'flag')
      .whereNotNull('code')
      .where('code', code)
      .first()

    if (student == null) {
      throw new Error(`Cannot find student with code ${code}`)
    }

    let instance = new this(student)
    yield instance.setupFlags()

    return instance
  }
}

module.exports = StudentWsAuth
