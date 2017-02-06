'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

const Database = use('Database')
const Hash = use('Hash')

class DatabaseSeeder {

  * run () {
    yield Database
      .table('positions')
      .insert([
        {
          name: 'President',
          order: 1
        },
        {
          name: 'Vice President',
          order: 2
        },
        {
          name: 'Secretary',
          order: 3
        },
        {
          name: 'Treasurer',
          order: 4
        },
        {
          name: 'P.R.O.',
          order: 5
        },
        {
          name: 'Auditor',
          order: 6
        },
      ])
      
    yield Database
      .table('accounts')
      .insert({
        name: 'Administrator',
        username: 'admin',
        password: yield Hash.make('admin'),
        role: 'admin'
      })
  }

}

module.exports = DatabaseSeeder
