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

Route.group('dashboard', function () {

  Route.get('/', 'Dashboard/MainController.index').as('dashboard.index')

  Route.get('login', 'Dashboard/MainController.login').as('dashboard.login')

  Route.post('login', 'Dashboard/MainController.login').as('dashboard.login.post')

}).prefix('dashboard')
