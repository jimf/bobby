/* eslint-env jest */
var model = require('../src/model')

function createMockEmitter (options) {
  return {
    on: jest.fn(options && options.on),
    emit: jest.fn(options && options.emit)
  }
}

describe('model', function () {
  test('initial state', function () {
    var state = {}
    var emitter = createMockEmitter()
    model(state, emitter)
    expect(state.game.game.moveHistory).toEqual([])
    expect(state.activeSquare).toBe(null)
  })

  describe('clickSquare handler', function () {
    test('should activate the square when activeSquare is null', function () {
      var callback
      var state = {}
      var emitter = createMockEmitter({
        on: function (eventName, cb) {
          if (eventName === 'clickSquare') { callback = cb }
        }
      })
      model(state, emitter)
      callback({ rank: 1, file: 'a' })
      expect(state.activeSquare).toEqual({ rank: 1, file: 'a' })
      expect(emitter.emit).toHaveBeenCalledWith('render')
    })

    test('should deactivate the square it is already active', function () {
      var callback
      var state = {}
      var emitter = createMockEmitter({
        on: function (eventName, cb) {
          if (eventName === 'clickSquare') { callback = cb }
        }
      })
      model(state, emitter)
      callback({ rank: 1, file: 'a' })
      callback({ rank: 1, file: 'a' })
      expect(state.activeSquare).toBe(null)
    })
  })
})
