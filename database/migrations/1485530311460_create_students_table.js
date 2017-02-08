'use strict'

const Schema = use('Schema')

class StudentsTableSchema extends Schema {

  up () {
    this.create('students', (table) => {
      table.string('id').primary()
      table.string('code').nullable()
      table.string('last_name')
      table.string('first_name')
      table.string('middle_name')
    })
  }

  down () {
    this.drop('students')
  }

}

module.exports = StudentsTableSchema
