/* eslint-env jest */
var State = require('../src/state')
var chess = require('../src/chess')
var presenter = require('../src/presenter')

describe('Presenter', function () {
  describe('activeSquare', function () {
    test('should be null when no square is active', function () {
      var state = State()
      expect(presenter(state).activeSquare).toBe(null)
    })

    test('should be active square when a square is active', function () {
      var state = State().clickSquare({ file: 'e', rank: 2 })
      expect(presenter(state).activeSquare).toBe(state.activeSquare)
    })
  })

  describe('activeModal', function () {
    test('should be state activeModal', function () {
      var state = State()
      expect(presenter(state).activeModal).toBe(state.activeModal)
    })
  })

  describe('activeTheme', function () {
    test('should be state activeTheme', function () {
      var state = State()
      expect(presenter(state).activeTheme).toBe(state.activeTheme)
    })
  })

  describe('capturedPieces', function () {
    test('should be captured piece state of game', function () {
      var state = State()
      var game = chess.createGame(state.getMoveHistory())
      var expected = chess.getCapturedPieces(game)
      expect(presenter(state).capturedPieces).toEqual(expected)
    })
  })

  describe('currentSide', function () {
    test('should be white for even turns', function () {
      var state = State()
      expect(presenter(state).currentSide).toBe('white')
    })

    test('should be black for odd turns', function () {
      var state = State()
        .clickSquare({ file: 'e', rank: 2 })
        .clickSquare({ file: 'e', rank: 4 })
      expect(presenter(state).currentSide).toBe('black')
    })
  })

  describe('moveHistory', function () {
    test('should be move history', function () {
      var state = State()
        .clickSquare({ file: 'e', rank: 2 })
        .clickSquare({ file: 'e', rank: 4 })
      expect(presenter(state).moveHistory).toEqual(['e4'])
    })
  })

  describe('squares', function () {
    test('should return 64 squares', function () {
      expect(presenter(State()).squares.length).toBe(64)
    })
  })
})
