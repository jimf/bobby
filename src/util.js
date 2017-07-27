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
