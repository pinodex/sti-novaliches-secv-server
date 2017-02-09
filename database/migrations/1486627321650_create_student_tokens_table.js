'use strict'

const Schema = use('Schema')

class StudentTokensTableSchema extends Schema {

  up () {
    this.create('student_tokens', (table) => {
      table.string('student_id').primary()
      table.string('value')
    })
  }

  down () {
    this.drop('student_tokens')
  }

}

module.exports = StudentTokensTableSchema
