/* eslint-env jest */
var chess = require('chess')
var subject = require('../src/chess')

describe('Chess', function () {
  describe('annotateMove', function () {
    test('should return input given no other state', function () {
      expect(subject.annotateMove('e7', {})).toBe('e7')
    })

    test('should return input with "+" annotation when move implies check', function () {
      expect(subject.annotateMove('e7', { isCheck: true })).toBe('e7+')
    })

    test('should return input with "#" annotation when move implies checkmate', function () {
      expect(subject.annotateMove('e7', { isCheckmate: true })).toBe('e7#')
    })
  })

  describe('createGame', function () {
    test('should return new game given empty move history', function () {
      var game = subject.createGame([])
      expect(game.game.moveHistory).toEqual([])
    })

    test('should return hydrated game given non-empty move history', function () {
      var game = subject.createGame(['e4', 'e5'])
      function algebraic (move) { return move.algebraic }
      expect(game.game.moveHistory.map(algebraic)).toEqual(['e4', 'e5'])
    })

    test('should return null for invalid input', function () {
      expect(subject.createGame(['invalid move'])).toBe(null)
    })
  })

  describe('getBoardSquare', function () {
    test('should return a board square by rank and file', function () {
      var gameStatus = chess.create().getStatus()
      var ranks = [1, 2, 3, 4, 5, 6, 7, 8]
      var files = 'abcdefgh'.split('')
      var allPositions = ranks.reduce(function (acc, rank) {
        return acc.concat(files.map(function (file) {
          return { rank: rank, file: file }
        }))
      }, [])
      allPositions.forEach(function (pos) {
        var actual = subject.getBoardSquare(pos.file, pos.rank, gameStatus)
        expect(actual).toEqual(expect.objectContaining(pos))
      })
    })
  })

  describe('getCapturedPieces', function () {
    test('should return no captured pieces when no pieces have been captured', function () {
      var game = chess.create()
      expect(subject.getCapturedPieces(game)).toEqual({
        white: { pawn: 0, rook: 0, knight: 0, bishop: 0, queen: 0 },
        black: { pawn: 0, rook: 0, knight: 0, bishop: 0, queen: 0 }
      })
    })

    test('should return captured pieces when pieces have been captured', function () {
      var game = chess.create()
      'e4 d5 exd5 Nf6 Nc3 Nxd5 Nxd5'.split(' ').forEach(function (move) {
        game.move(move)
      })
      expect(subject.getCapturedPieces(game)).toEqual({
        white: { pawn: 1, rook: 0, knight: 0, bishop: 0, queen: 0 },
        black: { pawn: 1, rook: 0, knight: 1, bishop: 0, queen: 0 }
      })
    })
  })

  describe('getMoveSourcesIndex', function () {
    test('should return an index of available move sources', function () {
      var gameStatus = chess.create().getStatus()
      expect(subject.getMoveSourcesIndex(gameStatus)).toEqual({
        b1: true,
        g1: true,
        a2: true,
        b2: true,
        c2: true,
        d2: true,
        e2: true,
        f2: true,
        g2: true,
        h2: true
      })
    })
  })

  describe('getMoves', function () {
    test('should return an index of move:notation pairs for given occupied square', function () {
      var gameStatus = chess.create().getStatus()
      expect(subject.getMoves({ file: 'g', rank: 1 }, gameStatus)).toEqual({
        f3: 'Nf3',
        h3: 'Nh3'
      })
    })
  })

  describe('getSquareColor', function () {
    test('should return whether given square is white or black', function () {
      var cases = [
        { input: ['a', 1], expected: 'black' },
        { input: ['a', 2], expected: 'white' },
        { input: ['h', 1], expected: 'white' },
        { input: ['a', 7], expected: 'black' }
      ]
      cases.forEach(function (testcase) {
        expect(subject.getSquareColor.apply(null, testcase.input)).toBe(testcase.expected)
      })
    })
  })

  describe('isSameSquare', function () {
    test('returns false if either value is null', function () {
      expect(subject.isSameSquare(null, { rank: 1, file: 'a' })).toBe(false)
      expect(subject.isSameSquare({ rank: 1, file: 'a' }, null)).toBe(false)
      expect(subject.isSameSquare(null, null)).toBe(false)
    })

    test('returns false if rank for file values do not match', function () {
      expect(subject.isSameSquare({ rank: 1, file: 'a' }, { rank: 1, file: 'b' })).toBe(false)
      expect(subject.isSameSquare({ rank: 1, file: 'a' }, { rank: 2, file: 'a' })).toBe(false)
    })

    test('returns true if rank and file values match', function () {
      expect(subject.isSameSquare({ rank: 1, file: 'a' }, { rank: 1, file: 'a' })).toBe(true)
    })
  })
})
