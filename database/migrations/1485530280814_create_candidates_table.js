'use strict'

const Schema = use('Schema')

class CandidatesTableSchema extends Schema {

  up () {
    this.create('candidates', (table) => {
      table.increments('id')
      table.integer('position_id')
      table.string('name')
      table.string('photo')
      table.text('description')
      table.timestamp('deleted_at').nullable().defaultsTo(null)
    })
  }

  down () {
    this.drop('candidates')
  }

}

module.exports = CandidatesTableSchema
