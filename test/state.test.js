/* eslint-env jest */
var State = require('../src/state')

describe('State', function () {
  describe('initialization', function () {
    test('with defaults', function () {
      var subject = State()
      expect(subject.toJSON()).toEqual({
        previousMoves: [],
        move: null,
        nextMoves: [],
        activeSquare: null,
        activeModal: null,
        activeTheme: 'default'
      })
    })

    test('with options', function () {
      var opts = {
        previousMoves: ['e4'],
        move: 'e5',
        nextMoves: ['Nf3'],
        activeSquare: 'e5',
        activeModal: 'dummy-modal',
        activeTheme: 'dummy-theme'
      }
      var subject = State(opts)
      expect(subject.toJSON()).toEqual(opts)
    })
  })

  describe('clickSquare', function () {
    test('should activate the square when activeSquare is null', function () {
      var subject = State().clickSquare({ rank: 1, file: 'a' })
      expect(subject.activeSquare).toEqual({ rank: 1, file: 'a' })
    })

    test('should deactivate square if it is already active', function () {
      var subject = State()
        .clickSquare({ rank: 1, file: 'a' })
        .clickSquare({ rank: 1, file: 'a' })
      expect(subject.activeSquare).toBe(null)
    })

    test('should move active pawn to destination square and deactivate active square', function () {
      var subject = State()
        .clickSquare({ file: 'e', rank: 2 })
        .clickSquare({ file: 'e', rank: 4 })
      expect(subject).toEqual(expect.objectContaining({
        activeSquare: null,
        previousMoves: [],
        move: 'e4'
      }))
    })

    test('should maintain previous move history as additional moves are made', function () {
      var subject = State()
        .clickSquare({ file: 'e', rank: 2 })
        .clickSquare({ file: 'e', rank: 4 })
        .clickSquare({ file: 'b', rank: 8 })
        .clickSquare({ file: 'c', rank: 6 })
      expect(subject).toEqual(expect.objectContaining({
        activeSquare: null,
        previousMoves: ['e4'],
        move: 'Nc6'
      }))
    })
  })

  describe('loadMoveList', function () {
    test('should load game state from a valid linear string of moves', function () {
      var subject = State().loadMoveList('e4\ne5\nNf3')
      expect(subject).toEqual(expect.objectContaining({
        previousMoves: ['e4', 'e5'],
        move: 'Nf3',
        nextMoves: []
      }))
    })

    test('should load game state from a valid formatted string of moves', function () {
      var subject = State().loadMoveList('1. e4 e5\n2. Nf3')
      expect(subject).toEqual(expect.objectContaining({
        previousMoves: ['e4', 'e5'],
        move: 'Nf3',
        nextMoves: []
      }))
    })

    test('should return current state for invalid input', function () {
      var initialState = State()
      var subject = initialState.loadMoveList('junk input')
      expect(subject).toEqual(initialState)
    })
  })

  describe('setTheme', function () {
    test('should update active theme', function () {
      var subject = State().setTheme('dummy-theme')
      expect(subject.activeModal).toBe(null)
      expect(subject.activeTheme).toBe('dummy-theme')
    })

    test('should return same state if state does not change', function () {
      var initialState = State()
      var subject = initialState.setTheme(initialState.activeTheme)
      expect(subject).toBe(initialState)
    })
  })

  describe('showModal', function () {
    test('should show given modal', function () {
      var subject = State().showModal('dummy-modal')
      expect(subject.activeModal).toBe('dummy-modal')
    })

    test('should return same state if state does not change', function () {
      var initialState = State()
      var subject = initialState.showModal(initialState.activeModal)
      expect(subject).toBe(initialState)
    })
  })

  describe('undoMove', function () {
    test('should return current state if no moves have been made', function () {
      var initialState = State()
      var subject = initialState.undoMove()
      expect(subject).toEqual(initialState)
    })

    test('should undo last move', function () {
      var subject = State()
        .clickSquare({ file: 'e', rank: 2 })
        .clickSquare({ file: 'e', rank: 4 })
        .undoMove()
      expect(subject).toEqual(expect.objectContaining({
        previousMoves: [],
        move: null,
        nextMoves: ['e4']
      }))
    })

    test('should undo multiple moves', function () {
      var subject = State()
        .clickSquare({ file: 'e', rank: 2 })
        .clickSquare({ file: 'e', rank: 4 })
        .clickSquare({ file: 'e', rank: 7 })
        .clickSquare({ file: 'e', rank: 5 })
        .undoMove()
        .undoMove()
      expect(subject).toEqual(expect.objectContaining({
        previousMoves: [],
        move: null,
        nextMoves: ['e4', 'e5']
      }))
    })
  })

  describe('redoMove', function () {
    test('should return current state if no moves have been undone', function () {
      var initialState = State()
      var subject = initialState.redoMove()
      expect(subject).toEqual(initialState)
    })

    test('should redo last undone move', function () {
      var subject = State()
        .clickSquare({ file: 'e', rank: 2 })
        .clickSquare({ file: 'e', rank: 4 })
        .undoMove()
        .redoMove()
      expect(subject).toEqual(expect.objectContaining({
        previousMoves: [],
        move: 'e4',
        nextMoves: []
      }))
    })

    test('should redo multiple moves', function () {
      var subject = State()
        .clickSquare({ file: 'e', rank: 2 })
        .clickSquare({ file: 'e', rank: 4 })
        .clickSquare({ file: 'e', rank: 7 })
        .clickSquare({ file: 'e', rank: 5 })
        .undoMove()
        .undoMove()
        .redoMove()
        .redoMove()
      expect(subject).toEqual(expect.objectContaining({
        previousMoves: ['e4'],
        move: 'e5',
        nextMoves: []
      }))
    })
  })
})
