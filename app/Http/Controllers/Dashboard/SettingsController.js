'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Setting = use('App/Model/Setting')
const Ws = use('Ws')

class SettingsController {
  * index (request, response) {
    const settings = (yield Setting.all()).toJSON()

    if (request.method() == 'POST') {
      const data = request.only(['show_names'])

      for (let entry in data) {
        let entryModel = yield Setting.find(entry)

        if (entryModel == null) {
          entryModel = new Setting()
          entryModel.id = entry
        }

        entryModel.value = data[entry]

        yield entryModel.save()
      }

      yield request.with({ flash: { type: 'success', message: 'Settings saved' }}).flash()
      
      response.route('dashboard.settings')
      return
    }

    const settingsFormatted = {}

    for (var i = 0; i < settings.length; i++) {
      settingsFormatted[settings[i].id] = settings[i].value
    }

    yield response.sendView('dashboard/settings/index', {
      settings: settingsFormatted
    })
  }

  * updateLive (request, response) {
    Ws.io.of('live').emit('casted')

    response.route('dashboard.settings')
  }
}

module.exports = SettingsController
