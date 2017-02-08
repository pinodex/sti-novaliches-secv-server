'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const crypto = require('crypto')

class SecureRandom {
  static generateALPHAnumeric (length) {
    return this.generate(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789')
  }

  static generateAlphanumeric (length) {
   return this.generate(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789') 
  }

  static generate (length, characters) {
    let randomBytes = crypto.randomBytes(length)
    let output = new Array(length)

    let cursor = 0

    for (let i = 0; i < length; i++) {
      cursor += randomBytes[i]
      output[i] = characters[cursor % characters.length]
    }

    return output.join('')
  }
}

module.exports = SecureRandom
