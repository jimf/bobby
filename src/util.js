exports.K = function (x) {
  return function (_) {
    return x
  }
}

/**
 * Object.assign ponyfill. Shallow-copy attributes from sources into target.
 */
exports.assign = function () {
  var args = Array.prototype.slice.call(arguments)
  return args.slice(1).reduce(function (acc, source) {
    if (source == null) { return acc }
    Object.keys(source).forEach(function (key) {
      acc[key] = source[key]
    })
    return acc
  }, args[0])
}

/**
 * Split up an array into an array of arrays of n length.
 *
 * @param {number} n Size of chunks
 * @param {*[]} xs Array to split
 * @return {*[][]}
 */
exports.chunksOf = function chunksOf (n, xs) {
  var result = []
  for (var i = 0; i < xs.length; i += 1) {
    if (i % n === 0) { result.push([]) }
    result[result.length - 1].push(xs[i])
  }
  return result
}

/**
 * Return a board square by rank and file. Currently node-chess stores the
 * board as a flat array, where index 0 == a1, and index 63 === h8. This
 * function abstracts that detail away.
 *
 *     8 |_
 *     7 |_
 *   R 6 |_
 *   A 5 |_
 *   N 4 |_
 *   K 3 |_
 *     2 |_
 *     1 |_________________
 *         a b c d e f g h
 *              FILE
 *
 * @param {string} file Board file (a-h)
 * @param {number} rank Board rank (1-8)
 * @param {object} gameStatus chessGame.getStatus() result
 * @return {object} Chess square
 */
exports.getBoardSquare = function getBoardSquare (file, rank, gameStatus) {
  var x = file.charCodeAt(0) - 97
  var y = rank - 1
  return gameStatus.board.squares[8 * y + x]
}

/**
 * Return an object representation of all captured pieces in a game.
 *
 * @param {object} game Chess game
 * @return {object}
 */
exports.getCapturedPieces = function getCapturedPieces (game) {
  return game.game.moveHistory.reduce(function (acc, move) {
    if (!move.capturedPiece) { return acc }
    var piece = move.capturedPiece
    acc[piece.side.name][piece.type] += 1
    return acc
  }, {
    white: { rook: 0, knight: 0, bishop: 0, queen: 0, king: 0, pawn: 0 },
    black: { rook: 0, knight: 0, bishop: 0, queen: 0, king: 0, pawn: 0 }
  })
}

/**
 * Returns an index of the legal move sources in a game state for quick
 * reference.
 *
 * @param {object} gameStatus chessGame.getStatus() result
 * @return {object}
 */
exports.getMoveSourcesIndex = function getMoveSourcesIndex (gameStatus) {
  return Object.keys(gameStatus.notatedMoves).reduce(function (acc, key) {
    var src = gameStatus.notatedMoves[key].src
    acc[src.file + src.rank] = true
    return acc
  }, {})
}

/**
 * Returns an index of square:notation pairs representing the possible moves
 * for a given occupied square.
 *
 * @param {object} square Chess square
 * @param {object} gameStatus chessGame.getStatus() result
 * @return {object}
 */
exports.getMoves = function getMoves (square, gameStatus) {
  return Object.keys(gameStatus.notatedMoves).reduce(function (acc, key) {
    var src = gameStatus.notatedMoves[key].src
    var dest = gameStatus.notatedMoves[key].dest
    var move = dest.file + dest.rank
    if (!exports.isSameSquare(src, square)) { return acc }
    acc[move] = key
    return acc
  }, {})
}

/**
 * Return whether the given file/rank is white or black.
 *
 * @param {string} file Board file (a-h)
 * @param {number} rank Board rank (1-8)
 * @return {string} "white" or "black"
 */
exports.getSquareSide = function getSquareSide (file, rank) {
  var x = 'abcdefgh'.indexOf(file)
  var y = rank - 1
  return (x + y) % 2 === 0 ? 'black' : 'white'
}

/**
 * Return whether two rank/file objects represent the same square.
 *
 * @param {object|null} s1 Square 1
 * @param {object|null} s2 Square 2
 * @return {boolean}
 */
exports.isSameSquare = function isSameSquare (s1, s2) {
  if (!s1 || !s2) { return false }
  return s1.rank === s2.rank && s1.file === s2.file
}

exports.times = function times (n, fn) {
  var result = []
  for (var i = 0; i < n; i += 1) {
    result.push(fn())
  }
  return result
}
