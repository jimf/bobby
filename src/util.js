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
 * @return {object} Chess square
 */
exports.getBoardSquare = function (file, rank, game) {
  var x = file.charCodeAt(0) - 97
  var y = rank - 1
  return game.getStatus().board.squares[8 * y + x]
}
