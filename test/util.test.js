/* eslint-env jest */
var chess = require('chess')
var subject = require('../src/util')

describe('util', function () {
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
        var actual = subject.getBoardSquare(pos.rank, pos.file, game)
        expect(actual).toEqual(expect.objectContaining(pos))
      })
    })
  })
})
