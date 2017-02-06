'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

class Acl {
  static get roles () {
    return [
      { moniker: 'admin', name: 'Administrator' },
      { moniker: 'committee', name: 'Committee' }
    ]
  }

  static getRoleName(moniker) {
    let role = this.roles.find((item) => {
      return moniker == item.moniker
    })

    if (role) {
      return role.name
    }

    return 'Unknown'
  }
}

module.exports = Acl
