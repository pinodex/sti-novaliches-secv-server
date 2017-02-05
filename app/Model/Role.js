'use strict'

const Lucid = use('Lucid')

class Role extends Lucid {
  accounts () {
    return this.hasMany('App/Model/Position')
  }

  getPermissions (permissions) {
    return permissions.split(',')
  }

  setPermissions (permissions) {
    return permissions.join(',')
  }
}

module.exports = Role
