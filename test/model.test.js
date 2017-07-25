/* eslint-env jest */
var model = require('../src/model')

describe('model', function () {
  test('initial state', function () {
    var state = {}
    model(state)
    expect(state.game.game.moveHistory).toEqual([])
  })
})
