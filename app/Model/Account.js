'use strict'

const Lucid = use('Lucid')

class Account extends Lucid {
  role () {
    return this.belongsTo('App/Model/Role')
  }
}

module.exports = Account
