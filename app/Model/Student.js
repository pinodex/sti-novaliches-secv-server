'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Lucid = use('Lucid')

class Student extends Lucid {
  static get computed () {
    return ['name']
  }

  token () {
    return this.hasOne('App/Model/StudentToken')
  }

  flag () {
    return this.hasOne('App/Model/StudentFlag')
  }

  votes () {
    return this.hasMany('App/Model/Vote')
  }

  getName() {
    return `${this.last_name}, ${this.first_name} ${this.middle_name}`
  }

  static rules (id) {
    return {
      id: 'required',
      last_name: 'required',
      first_name: 'required'
    }
  }

  static get validationMessages () {
    return {
      'id.required': 'Student ID field is required',
      'last_name.required': 'Last name field cannot be empty',
      'first_name.required': 'First name field cannot be empty',
    }
  }

  static get createTimestamp () {
    return null
  }

  static get updateTimestamp () {
    return null
  }
}

module.exports = Student
