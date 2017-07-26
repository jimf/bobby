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
        { bar: 3, baz: 4 },
      )
      expect(actual).toEqual({ foo: 1, bar: 3, baz: 4 })
      expect(target).toEqual(actual)
    })
  })

  describe('getBoardSquare', function () {
    test('should return a board square by rank and file', function () {
      var game = chess.create()
      var ranks = [1, 2, 3, 4, 5, 6, 7, 8]
      var files = 'abcdefgh'.split('')
      var allPositions = ranks.reduce(function (acc, rank) {
        return acc.concat(files.map(function (file) {
          return { rank: rank, file: file }
        }))
      }, [])
      allPositions.forEach(function (pos) {
        var actual = subject.getBoardSquare(pos.file, pos.rank, game)
        expect(actual).toEqual(expect.objectContaining(pos))
      })
    })
  })
})
