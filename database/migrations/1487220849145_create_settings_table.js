'use strict'

const Schema = use('Schema')

class SettingsTableSchema extends Schema {

  up () {
    this.create('settings', (table) => {
      table.string('id').primary()
      table.text('value')
    })
  }

  down () {
    this.drop('settings')
  }

}

module.exports = SettingsTableSchema
