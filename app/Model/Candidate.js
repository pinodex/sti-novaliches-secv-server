'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Lucid = use('Lucid')

class Candidate extends Lucid {
  position () {
    return this.belongsTo('App/Model/Position')
  }

  static rules (id) {
    return {
      position_id: 'required',
      name: 'required',
      description: 'required'
    }
  }

  static get validationMessages () {
    return {
      'name.required': 'Name field cannot be empty',
      'position_id.required': 'Position is required',
      'description.required': 'Description field cannot be empty'
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

module.exports = Candidate
