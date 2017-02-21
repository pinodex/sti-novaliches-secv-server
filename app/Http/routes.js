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

  Route
    .get('/', 'Dashboard/MainController.index')
    .as('dashboard.index')
    .middleware('auth')

  Route
    .route('login', ['GET', 'POST'], 'Dashboard/MainController.login')
    .as('dashboard.login')

  Route
    .get('logout', 'Dashboard/MainController.logout')
    .as('dashboard.logout')
    .middleware('auth')

})
.prefix('dashboard')

Route.group('dashboard.accounts', function () {

  Route
    .get('/', 'Dashboard/AccountsController.index')
    .as('dashboard.accounts')

  Route
    .route('add', ['GET', 'POST'], 'Dashboard/AccountsController.edit')
    .as('dashboard.accounts.add')

  Route
    .route(':id/edit', ['GET', 'POST'], 'Dashboard/AccountsController.edit')
    .as('dashboard.accounts.edit')

  Route
    .route(':id/delete', ['GET', 'POST'], 'Dashboard/AccountsController.delete')
    .as('dashboard.accounts.delete')

})
.prefix('dashboard/accounts')
.middleware('auth:admin')

Route.group('dashboard.positions', function () {

  Route
    .get('/', 'Dashboard/PositionsController.index')
    .as('dashboard.positions')

  Route
    .route('add', ['GET', 'POST'], 'Dashboard/PositionsController.edit')
    .as('dashboard.positions.add')

  Route
    .route(':id/edit', ['GET', 'POST'], 'Dashboard/PositionsController.edit')
    .as('dashboard.positions.edit')

  Route
    .route(':id/delete', ['GET', 'POST'], 'Dashboard/PositionsController.delete')
    .as('dashboard.positions.delete')    

})
.prefix('dashboard/positions')
.middleware('auth:admin')

Route.group('dashboard.candidates', function () {

  Route
    .get('/', 'Dashboard/CandidatesController.index')
    .as('dashboard.candidates')

  Route
    .route('add', ['GET', 'POST'], 'Dashboard/CandidatesController.edit')
    .as('dashboard.candidates.add')

  Route
    .route(':id/edit', ['GET', 'POST'], 'Dashboard/CandidatesController.edit')
    .as('dashboard.candidates.edit')

  Route
    .route(':id/delete', ['GET', 'POST'], 'Dashboard/CandidatesController.delete')
    .as('dashboard.candidates.delete')    

})
.prefix('dashboard/candidates')
.middleware('auth:admin')

Route.group('dashboard.students', function () {

  Route
    .get('/', 'Dashboard/StudentsController.index')
    .as('dashboard.students')
    .middleware('auth')

  Route
    .route('add', ['GET', 'POST'], 'Dashboard/StudentsController.edit')
    .as('dashboard.students.add')
    .middleware('auth:admin')

  Route
    .route(':id/code', ['GET', 'POST'], 'Dashboard/StudentsController.code')
    .as('dashboard.students.code')
    .middleware('auth')

  Route
    .route(':id/edit', ['GET', 'POST'], 'Dashboard/StudentsController.edit')
    .as('dashboard.students.edit')
    .middleware('auth:admin')

  Route
    .route(':id/delete', ['GET', 'POST'], 'Dashboard/StudentsController.delete')
    .as('dashboard.students.delete')
    .middleware('auth:admin')

})
.prefix('dashboard/students')

Route.group('dashboard.results', function () {

  Route
    .get('/', 'Dashboard/ResultsController.index')
    .as('dashboard.results')

})
.prefix('dashboard/results')
.middleware('auth:admin')

Route.group('dashboard.stats', function () {

  Route
    .get('/', 'Dashboard/StatsController.index')
    .as('dashboard.stats')

  Route
    .get('all', 'Dashboard/StatsController.all')
    .as('dashboard.stats.all')

})
.prefix('dashboard/stats')
.middleware('auth:admin')

Route.group('dashboard.settings', function () {

  Route
    .route('/', ['GET', 'POST'], 'Dashboard/SettingsController.index')
    .as('dashboard.settings')

  Route
    .post('update_live', 'Dashboard/SettingsController.updateLive')
    .as('dashboard.settings.update_live')

})
.prefix('dashboard/settings')
.middleware('auth:admin')
