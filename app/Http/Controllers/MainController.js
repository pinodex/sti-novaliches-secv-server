'use strict'

const ElectionRepository = use('App/Repositories/ElectionRepository')

class MainController {
  * index(request, response) {
    let positions = yield ElectionRepository.getPositions()
    let candidates = yield ElectionRepository.getCandidates()

    yield response.sendView('index', {
      positions: positions,
      candidates: candidates
    })
  }
}

module.exports = MainController
