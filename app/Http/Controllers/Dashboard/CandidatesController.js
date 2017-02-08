'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Candidate = use('App/Model/Candidate'),
      Position = use('App/Model/Position'),
      Validator = use('Validator'),
      Helpers = use('Helpers')

const path = require('path'),
      slugify = require('slugify'),
      fs = require('fs-extra'),
      randomstring = require('randomstring')

class CandidatesController {
  static get allowedUploadMimes () {
    return ['image/jpg', 'image/jpeg', 'image/png']
  }

  * index (request, response) {
    const candidates = yield Candidate.with('position').orderBy('name').fetch()

    yield response.sendView('dashboard/candidates/index', {
      candidates: candidates
    })
  }

  * edit (request, response) {
    const paramId = request.param('id')
    const positions = yield Position.query().orderBy('order').fetch()
    let candidate = new Candidate()

    if (paramId) {
      candidate = yield Candidate.find(paramId)
    }

    if (candidate == null) {
      yield request.with({ flash: { type: 'alert', message: 'Cannot find requested candidate' }}).flash()

      response.route('dashboard.candidates')
      return
    }

    if (request.method() == 'POST') {
      const data = request.only(['name', 'position_id', 'description'])
      const photo = request.file('photo')

      const validation = yield Validator.validate(data, Candidate.rules(candidate.id), Candidate.validationMessages)

      if (validation.fails()) {
        yield request.withAll().andWith({ errors: validation.messages() }).flash()

        if (candidate.id) {
          response.route('dashboard.candidates.edit', { id: candidate.id })
          return
        }

        if (candidate.id) {
          response.route('dashboard.candidates.edit', { id: candidate.id })
          return
        }

        response.route('dashboard.candidates.add')
        return
      }

      if (photo.file.size != 0 || !candidate.id) {
        if (CandidatesController.allowedUploadMimes.indexOf(photo.file.type) === -1) {
          yield request.withAll().andWith({ errors: [{ message: 'Please upload a valid photo' }]}).flash()

          if (candidate.id) {
            response.route('dashboard.candidates.edit', { id: candidate.id })
            return
          }

          response.route('dashboard.candidates.add')
          return
        }

        const fileName = `${slugify(data.name)}-${randomstring.generate(8)}${path.extname(photo.file.name)}`

        try {
          fs.copySync(photo.file.path, Helpers.storagePath(`uploads/${fileName}`))
        } catch (e) {
          yield request.withAll().andWith({ errors: [{ message: 'File upload error' }]}).flash()

          if (candidate.id) {
            response.route('dashboard.candidates.edit', { id: candidate.id })
            return
          }

          response.route('dashboard.candidates.add')
          return
        }

        data['photo'] = fileName
      }

      candidate.fill(data)
      
      yield candidate.save()
      yield request.with({ flash: { type: 'success', message: `${data.name} candidate has been added` }}).flash()
      
      response.route('dashboard.candidates')
      return
    }

    yield response.sendView('dashboard/candidates/edit', {
      positions: positions,
      candidate: candidate
    })
  }

  * delete (request, response) {
    const candidate = yield Candidate.find(request.param('id'))

    if (candidate == null) {
      yield request.with({ flash: { type: 'alert', message: 'Cannot find requested candidate' }}).flash()

      response.route('dashboard.candidates')
      return
    }

    if (request.method() == 'POST') {
      yield candidate.delete()
      yield request.with({ flash: { type: 'success', message: `Candidate ${candidate.name} has been deleted` }}).flash()
      
      response.route('dashboard.candidates')
    }

    yield response.sendView('dashboard/candidates/delete', {
      candidate: candidate
    })
  }
}

module.exports = CandidatesController
