'use strict'

const Schema = use('Schema')

class VotesTableSchema extends Schema {

  up () {
    this.create('votes', (table) => {
      table.string('student_id')
      table.integer('candidate_id')
      table.timestamp('created_at').nullable().defaultsTo(null)

      table.primary(['student_id', 'candidate_id'])
    })
  }

  down () {
    this.drop('votes')
  }

}

module.exports = VotesTableSchema
