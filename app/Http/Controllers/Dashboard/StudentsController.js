'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Student = use('App/Model/Student')
const Validator = use('Validator')

class StudentsController {
  * index (request, response) {
    const page = request.input('page', 1)
    const searchId = request.input('id', null),
          searchLastName = request.input('last_name', null),
          searchFirstName = request.input('first_name', null)

    let students = yield Student.query()
      .where(function () {
        if (searchId) {
          this.where('id', searchId)
        }

        if (searchLastName) {
          this.where('last_name', 'LIKE', `%${searchLastName}%`)
        }

        if (searchFirstName) {
          this.students.where('first_name', 'LIKE', `%${searchFirstName}%`)
        }
      })
      .orderBy('last_name')
      .orderBy('first_name')
      .orderBy('middle_name')
      .paginate(page)

    yield response.sendView('dashboard/students/index', {
      students: students.toJSON(),
      query: request.get()
    })
  }

  * edit (request, response) {
    const paramId = request.param('id')
    let student = new Student()

    if (paramId) {
      student = yield Student.find(paramId)
    }

    if (student == null) {
      yield request.with({ flash: { type: 'alert', message: 'Cannot find requested student' }}).flash()

      response.route('dashboard.students')
      return
    }

    if (request.method() == 'POST') {
      const data = request.only(['id', 'last_name', 'first_name', 'middle_name'])

      if (student.id) {
        data['id'] = student.id
      }

      const validation = yield Validator.validate(data, Student.rules(), Student.validationMessages)

      if (validation.fails()) {
        yield request.withAll().andWith({ errors: validation.messages() }).flash()

        if (student.id) {
          response.route('dashboard.students.edit', { id: student.id })
          return
        }

        response.route('dashboard.students.add')
        return
      }

      student.fill(data)

      yield student.save()
      yield request.with({ flash: { type: 'success', message: `Changes to student has been saved` }}).flash()
      
      response.route('dashboard.students')
      return
    }

    yield response.sendView('dashboard/students/edit', {
      student: student
    })
  }

  * delete (request, response) {
    const student = yield Student.find(request.param('id'))

    if (student == null) {
      yield request.with({ flash: { type: 'alert', message: 'Cannot find requested student' }}).flash()

      response.route('dashboard.students')
      return
    }

    if (request.method() == 'POST') {
      yield student.delete()
      yield request.with({ flash: { type: 'success', message: `Student has been deleted` }}).flash()
      
      response.route('dashboard.students')
      return
    }

    yield response.sendView('dashboard/students/delete', {
      student: student
    })
  }
}

module.exports = StudentsController
