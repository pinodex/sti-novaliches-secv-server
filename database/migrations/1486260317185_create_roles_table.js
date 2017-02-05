'use strict'

const Schema = use('Schema')

class RolesTableSchema extends Schema {

  up () {
    this.create('roles', (table) => {
      table.increments('id')
      table.string('name')
      table.text('permissions')
    })
  }

  down () {
    this.drop('roles')
  }

}

module.exports = RolesTableSchema
