'use strict'

const Schema = use('Schema')

class StudentsTableSchema extends Schema {

  up () {
    this.create('students', (table) => {
      table.string('id').primary()
      table.string('code').nullable()
      table.string('name')
    })
  }

  down () {
    this.drop('students')
  }

}

module.exports = StudentsTableSchema
