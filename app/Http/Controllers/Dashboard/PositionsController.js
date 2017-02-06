'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Position = use('App/Model/Position')

class PositionsController {
  * index (request, response) {
    const positions = yield Position.with('candidates').orderBy('order').fetch()

    yield response.sendView('dashboard/positions/index', {
      positions: positions
    })
  }

  * add (request, response) {
    const lastPosition = yield Position.query().orderBy('id', 'DESC').first()

    if (request.method() == 'POST') {
      const data = request.only(['name', 'order'])
      
      yield Position.create(data)
      yield request.with({ flash: { type: 'success', message: `${data.name} position has been added` }}).flash()
      
      response.route('dashboard.positions')
      return
    }

    yield response.sendView('dashboard/positions/edit', {
      nextDisplayOrder: lastPosition.order + 1
    })
  }

  * edit (request, response) {
    const position = yield Position.find(request.param('id'))

    if (position == null) {
      yield request.with({ flash: { type: 'alert', message: 'Cannot find requested position' }}).flash()

      response.route('dashboard.positions')
      return
    }

    if (request.method() == 'POST') {
      const data = request.only(['name', 'order'])

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
