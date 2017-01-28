'use strict'

const Schema = use('Schema')

class PositionsTableSchema extends Schema {

  up () {
    this.create('positions', (table) => {
      table.increments('id')
      table.string('name')
      table.integer('order')
    })
  }

  down () {
    this.drop('positions')
  }

}

module.exports = PositionsTableSchema
