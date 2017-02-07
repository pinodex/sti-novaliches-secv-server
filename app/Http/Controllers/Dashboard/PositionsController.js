'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Position = use('App/Model/Position')
const Validator = use('Validator')

class PositionsController {
  * index (request, response) {
    const positions = yield Position.with('candidates').orderBy('order').fetch()

    yield response.sendView('dashboard/positions/index', {
      positions: positions
    })
  }

  * edit (request, response) {
    const paramId = request.param('id')
    let position = new Position()

    if (paramId) {
      position = yield Position.find(paramId)
    }

    if (position == null) {
      yield request.with({ flash: { type: 'alert', message: 'Cannot find requested position' }}).flash()

      response.route('dashboard.positions')
      return
    }

    if (request.method() == 'POST') {
      const data = request.only(['name', 'order'])
      const validation = yield Validator.validate(data, Position.rules(), Position.validationMessages)

      if (validation.fails()) {
        yield request.withAll().andWith({ errors: validation.messages() }).flash()

        if (position.id) {
          response.route('dashboard.positions.edit', { id: position.id })
          return
        }

        response.route('dashboard.positions.add')
        return
      }

      position.fill(data)

      yield position.save()
      yield request.with({ flash: { type: 'success', message: `Changes to ${position.name} position has been saved` }}).flash()
      
      response.route('dashboard.positions')
      return
    }

    yield response.sendView('dashboard/positions/edit', {
      position: position
    })
  }

  * delete (request, response) {
    const position = yield Position.find(request.param('id'))

    if (position == null) {
      yield request.with({ flash: { type: 'alert', message: 'Cannot find requested position' }}).flash()

      response.route('dashboard.positions')
      return
    }

    if (request.method() == 'POST') {
      yield position.delete()
      yield request.with({ flash: { type: 'success', message: `${position.name} position has been deleted` }}).flash()
      
      response.route('dashboard.positions')
      return
    }

    yield response.sendView('dashboard/positions/delete', {
      position: position
    })
  }
}

module.exports = PositionsController
