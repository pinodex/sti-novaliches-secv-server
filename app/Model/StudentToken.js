'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Lucid = use('Lucid')

class StudentToken extends Lucid {
  static get primaryKey () {
    return 'student_id'
  }
  
  student () {
    return this.belongsTo('App/Model/Student')
  }
  
  static get createTimestamp () {
    return null
  }

  static get updateTimestamp () {
    return null
  }
}

module.exports = StudentToken
