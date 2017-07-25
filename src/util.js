/**
 * Return a board square by rank and file
 *
 * FIXME
 *
 * @param {number} rank Board rank (1-8)
 * @param {string} file Board file (a-h)
 * @return {object} Chess square
 */
exports.getBoardSquare = function (rank, file, game) {
  var x = file.charCodeAt(0) - 97
  var y = 7 - (rank - 1)
  return game.getStatus().board.squares[8 * y + x]
}
