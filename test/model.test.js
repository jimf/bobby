/* eslint-env jest */
var chess = require('chess')
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
      var clickSquare
      var state = {}
      var emitter = createMockEmitter({
        on: function (eventName, cb) {
          if (eventName === 'clickSquare') { clickSquare = cb }
        }
      })
      model(state, emitter)
      clickSquare({ rank: 1, file: 'a' })
      expect(state.activeSquare).toEqual({ rank: 1, file: 'a' })
      expect(emitter.emit).toHaveBeenCalledWith('render')
    })

    test('should deactivate the square it is already active', function () {
      var clickSquare
      var state = {}
      var emitter = createMockEmitter({
        on: function (eventName, cb) {
          if (eventName === 'clickSquare') { clickSquare = cb }
        }
      })
      model(state, emitter)
      clickSquare({ rank: 1, file: 'a' })
      clickSquare({ rank: 1, file: 'a' })
      expect(state.activeSquare).toBe(null)
    })

    test('should move active pawn to destination square and deactivate active square', function () {
      var clickSquare
      var state = {}
      var emitter = createMockEmitter({
        on: function (eventName, cb) {
          if (eventName === 'clickSquare') { clickSquare = cb }
        }
      })
      model(state, emitter)
      clickSquare({ rank: 2, file: 'e' })
      clickSquare({ rank: 4, file: 'e' })
      expect(state.activeSquare).toBe(null)
      expect(state.game.getStatus().board.lastMovedPiece.type).toBe('pawn')
    })

    test('should move active knight to destination square and deactivate active square', function () {
      var clickSquare
      var state = {}
      var emitter = createMockEmitter({
        on: function (eventName, cb) {
          if (eventName === 'clickSquare') { clickSquare = cb }
        }
      })
      model(state, emitter)
      clickSquare({ rank: 1, file: 'g' })
      clickSquare({ rank: 3, file: 'f' })
      expect(state.activeSquare).toBe(null)
      expect(state.game.getStatus().board.lastMovedPiece.type).toBe('knight')
    })
  })

  describe('loadMoveList handler', function () {
    test('should load game state from a valid linear string of moves', function () {
      var loadMoveList
      var state = {}
      var emitter = createMockEmitter({
        on: function (eventName, cb) {
          if (eventName === 'loadMoveList') { loadMoveList = cb }
        }
      })
      var expectedGame = chess.create()
      expectedGame.move('e4')
      expectedGame.move('e5')
      expectedGame.move('Nf3')
      model(state, emitter)
      loadMoveList('e4\ne5\nNf3')
      expect(state.game.game.getHashCode()).toBe(expectedGame.game.getHashCode())
      expect(state.showLoadGameModal).toBe(false)
      expect(emitter.emit).toHaveBeenCalledWith('render')
    })

    test('should load game state from a valid formatted string of moves', function () {
      var loadMoveList
      var state = {}
      var emitter = createMockEmitter({
        on: function (eventName, cb) {
          if (eventName === 'loadMoveList') { loadMoveList = cb }
        }
      })
      var expectedGame = chess.create()
      expectedGame.move('e4')
      expectedGame.move('e5')
      expectedGame.move('Nf3')
      model(state, emitter)
      loadMoveList('1. e4 e5\n2. Nf3')
      expect(state.game.game.getHashCode()).toBe(expectedGame.game.getHashCode())
      expect(state.showLoadGameModal).toBe(false)
      expect(emitter.emit).toHaveBeenCalledWith('render')
    })
  })
})
