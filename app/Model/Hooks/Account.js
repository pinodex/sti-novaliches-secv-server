'use strict'

const Hash = use('Hash')
const Account = exports = module.exports = {}

Account.encryptPassword = function * (next) {
  this.password = yield Hash.make(this.password)
  yield next
}
