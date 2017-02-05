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
      .get('login', 'Dashboard/MainController.getLogin')
      .as('dashboard.login')

    Route
      .post('login', 'Dashboard/MainController.postLogin')
      .as('dashboard.login.post')

    Route
      .get('logout', 'Dashboard/MainController.getLogout')
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
      .get('add', 'Dashboard/AccountsController.getAdd')
      .as('dashboard.accounts.add')

    Route
      .post('add', 'Dashboard/AccountsController.postAdd')
      .as('dashboard.accounts.add.post')

    Route
      .get(':id/edit', 'Dashboard/AccountsController.getEdit')
      .as('dashboard.accounts.edit')

  })
  .prefix('dashboard/accounts')
  .middleware('auth')
