'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', function * (request, response) {
  response.send('SECV Server')
})

Route
  .group('dashboard', function () {

    Route
      .get('/', 'Dashboard/MainController.index')
      .as('dashboard.index')
      .middleware('auth')

    Route
      .any('login', 'Dashboard/MainController.login')
      .as('dashboard.login')

    Route
      .get('logout', 'Dashboard/MainController.logout')
      .as('dashboard.logout')
      .middleware('auth')

  })
  .prefix('dashboard')

Route
  .group('dashboard.accounts', function () {

    Route
      .get('/', 'Dashboard/AccountsController.index')
      .as('dashboard.accounts')
      .middleware('auth')

    Route
      .any('add', 'Dashboard/AccountsController.add')
      .as('dashboard.accounts.add')

    Route
      .any(':id/edit', 'Dashboard/AccountsController.edit')
      .as('dashboard.accounts.edit')

    Route
      .any(':id/delete', 'Dashboard/AccountsController.delete')
      .as('dashboard.accounts.delete')

  })
  .prefix('dashboard/accounts')
  .middleware('auth')
