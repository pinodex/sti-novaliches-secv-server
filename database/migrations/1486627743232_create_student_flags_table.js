'use strict'

const Schema = use('Schema')

class StudentFlagsTableSchema extends Schema {

  up () {
    this.create('student_flags', (table) => {
      table.string('student_id').primary()
      table.boolean('can_vote').defaultsTo(true)
    })
  }

  down () {
    this.drop('student_flags')
  }

}

module.exports = StudentFlagsTableSchema
