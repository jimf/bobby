/* eslint-env jest */
var model = require('../src/model')
var State = require('../src/state')

function createMockEmitter (options) {
  return {
    on: jest.fn(options && options.on),
    emit: jest.fn(options && options.emit)
  }
}

describe('model', function () {
  test('initial state without preferences', function () {
    var state = {}
    var emitter = createMockEmitter()
    model({})(state, emitter)
    expect(state.state).toEqual(State())
    expect(emitter.on).toHaveBeenCalledWith('*', expect.any(Function))
  })

  test('initial state with preferences', function () {
    var state = {}
    var emitter = createMockEmitter()
    model({ preferences: { theme: 'dummy-theme' } })(state, emitter)
    expect(state.state).toEqual(State().setTheme('dummy-theme'))
    expect(emitter.on).toHaveBeenCalledWith('*', expect.any(Function))
  })

  test('setTheme action handler', function () {
    var handler
    var state = {}
    var emitter = createMockEmitter({
      on: function (eventName, cb) {
        handler = cb
      }
    })
    var opts = {
      savePreferences: jest.fn()
    }
    model(opts)(state, emitter)
    handler('setTheme', 'dummy-theme')

    expect(state.state).toEqual(State().setTheme('dummy-theme'))
    expect(opts.savePreferences).toHaveBeenCalledWith({
      version: 1,
      theme: 'dummy-theme'
    })
    expect(emitter.emit).toHaveBeenCalledWith('render')
  })

  test('closeModal action handler', function () {
    var handler
    var state = {}
    var emitter = createMockEmitter({
      on: function (eventName, cb) {
        handler = cb
      }
    })
    model({})(state, emitter)
    handler('showModal', 'dummy-modal')
    handler('closeModal')

    expect(state.state.activeModal).toBe(null)
  })

  test('unhandled action', function () {
    var handler
    var state = {}
    var emitter = createMockEmitter({
      on: function (eventName, cb) {
        handler = cb
      }
    })
    model({})(state, emitter)
    handler('unhandledAction')

    expect(state.state).toEqual(State())
  })

  test('handled action that does not modify state', function () {
    var handler
    var state = {}
    var emitter = createMockEmitter({
      on: function (eventName, cb) {
        handler = cb
      }
    })
    model({})(state, emitter)
    handler('loadMoveList', 'junk input')

    expect(state.state).toEqual(State())
    expect(emitter.emit).not.toHaveBeenCalledWith('render')
  })

  test('other handled action that modifies state', function () {
    var handler
    var state = {}
    var emitter = createMockEmitter({
      on: function (eventName, cb) {
        handler = cb
      }
    })
    model({})(state, emitter)
    handler('clickSquare', { file: 'e', rank: 2 })

    expect(state.state).toEqual(State().clickSquare({ file: 'e', rank: 2 }))
    expect(emitter.emit).toHaveBeenCalledWith('render')
  })
})
