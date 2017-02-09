'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Lucid = use('Lucid')

class Position extends Lucid {
  candidates () {
    return this.hasMany('App/Model/Candidate')
  }

  static rules (id) {
    return {
      name: 'required',
      order: 'required'
    }
  }

  static get validationMessages () {
    return {
      'name.required': 'Name field cannot be empty',
      'order.required': 'Order field cannot be empty'
    }
  }

  static get createTimestamp () {
    return null
  }

  static get updateTimestamp () {
    return null
  }

  static get deleteTimestamp () {
    return 'deleted_at'
  }

  static get hidden () {
    return ['deleted_at']
  }
}

module.exports = Position
