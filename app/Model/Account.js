'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Client
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Lucid = use('Lucid')
const Hash = use('Hash')

class Account extends Lucid {
  role () {
    return this.belongsTo('App/Model/Role')
  }

  static boot () { 
    super.boot()
    this.addHook('beforeCreate', 'Account.encryptPassword') 
  }

  static get rules () {
    return {
      name: 'required',
      username: 'required|unique:accounts,username,id,${userId}',
      password_confirm: 'required_if:password|same:password'
    }
  }

  static get validationMessages () {
    return {
      'name.required': 'Name field cannot be empty',
      'username.required': 'Username field cannot be empty',
      'username.unique': 'Username already in use',
      'password_confirm.required_if': 'Password confirmation field cannot be empty',
      'password_confirm.same': 'Password confirmation does not match'
    }
  }
}

module.exports = Account
