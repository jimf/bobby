/* eslint-env jest */
var chess = require('chess')
var subject = require('../src/util')

describe('util', function () {
  describe('assign', function () {
    test('should mimic Object.assign', function () {
      var target = {}
      var actual = subject.assign(
        target,
        { foo: 1 },
        null,
        undefined,
        { bar: 2 },
        { bar: 3, baz: 4 }
      )
      expect(actual).toEqual({ foo: 1, bar: 3, baz: 4 })
      expect(target).toEqual(actual)
    })
  })

  describe('chunksOf', function () {
    test('should split array into n-sized chunks', function () {
      var cases = [
        { input: [2, []], expected: [] },
        { input: [2, [1, 2, 3, 4, 5]], expected: [[1, 2], [3, 4], [5]] },
        { input: [3, [1, 2, 3, 4, 5, 6]], expected: [[1, 2, 3], [4, 5, 6]] }
      ]
      cases.forEach(function (testcase) {
        expect(subject.chunksOf.apply(null, testcase.input)).toEqual(testcase.expected)
      })
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

  describe('getSquareSide', function () {
    test('should return whether given square is white or black', function () {
      var cases = [
        { input: ['a', 1], expected: 'black' },
        { input: ['a', 2], expected: 'white' },
        { input: ['h', 1], expected: 'white' },
        { input: ['a', 7], expected: 'black' }
      ]
      cases.forEach(function (testcase) {
        expect(subject.getSquareSide.apply(null, testcase.input)).toBe(testcase.expected)
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
