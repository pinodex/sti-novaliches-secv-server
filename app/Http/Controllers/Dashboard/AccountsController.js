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

  * add (request, response) {
    const roles = yield Role.all()

    if (request.method() == 'POST') {
      const data = request.only([
        'name',
        'username',
        'password',
        'password_confirm',
        'role_id'
      ])

      const validation = yield Validator.validate(data, Account.rules(), Account.validationMessages)

      if (validation.fails()) {
        yield request.withAll().andWith({ errors: validation.messages() }).flash()

        response.route('dashboard.accounts.add')
        return
      }

      delete data['password_confirm']
      
      yield Account.create(data)
      yield request.with({ flash: { type: 'success', message: `Account ${data.name} has been created` }}).flash()
      
      response.route('dashboard.accounts')
      return
    }

    yield response.sendView('dashboard/accounts/edit', {
      roles: roles
    })
  }

  * edit (request, response) {
    const account = yield Account.find(request.param('id'))

    if (account == null) {
      yield request.with({ flash: { type: 'alert', message: 'Cannot find requested account' }}).flash()

      response.route('dashboard.accounts')
      return
    }

    if (request.method() == 'POST') {
      const data = request.only([
        'name',
        'username',
        'password',
        'password_confirm',
        'role_id'
      ])

      const validation = yield Validator.validate(data, Account.rules(account.id), Account.validationMessages)

      if (validation.fails()) {
        yield request.withAll().andWith({ errors: validation.messages() }).flash()

        response.route('dashboard.accounts.edit', { id: account.id })
        return
      }

      delete data['password_confirm']

      if (data['password'] == '') {
        delete data['password']
      }

      account.fill(data)

      yield account.save()
      yield request.with({ flash: { type: 'success', message: `Changes to ${account.name} has been saved` }}).flash()
      
      response.route('dashboard.accounts')
      return
    }

    const roles = yield Role.all()

    yield response.sendView('dashboard/accounts/edit', {
      roles: roles,
      account: account
    })
  }

  * delete (request, response) {
    const account = yield Account.find(request.param('id'))

    if (account == null) {
      yield request.with({ flash: { type: 'alert', message: 'Cannot find requested account' }}).flash()

      response.route('dashboard.accounts')
      return
    }

    if (request.method() == 'POST') {
      yield account.delete()
      yield request.with({ flash: { type: 'success', message: `${account.name} account has been deleted` }}).flash()
      
      response.route('dashboard.accounts')
    }

    yield response.sendView('dashboard/accounts/delete', {
      account: account
    })
  }
}

module.exports = AccountsController
