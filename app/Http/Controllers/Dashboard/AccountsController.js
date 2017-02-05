'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Client
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Account = use('App/Model/Account')
const Role = use('App/Model/Role')
const Validator = use('Validator')

class AccountsController {
  * index (request, response) {
    const accounts = yield Account.with('role').fetch()

    yield response.sendView('dashboard/accounts/index', {
      accounts: accounts
    })
  }

  * getAdd (request, response) {
    const roles = yield Role.all()

    yield response.sendView('dashboard/accounts/edit', {
      roles: roles
    })
  }

  * postAdd (request, response) {
    const data = request.only([
      'name', 'username', 'password', 'password_confirm', 'role_id'
    ])

    const validation = yield Validator.validate(data, Account.rules, Account.validationMessages)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.route('dashboard.accounts.add')

      return
    }

    yield Account.create(request.only([
      'name', 'username', 'password', 'role_id'
    ]))

    yield request
      .with({ flash: { type: 'success', message: `${data.name} has been created` }})
      .flash()

    response.route('dashboard.accounts')
  }

  * getEdit (request, response) {
    const account = yield Account.find(request.param('id'))

    if (account == null) {
      yield request
        .with({ flash: { type: 'alert', message: 'Cannot find requested account' }})
        .flash()

      response.route('dashboard.accounts')
      return
    }

    const roles = yield Role.all()

    yield response.sendView('dashboard/accounts/edit', {
      roles: roles,
      account: account
    })
  }
}

module.exports = AccountsController
