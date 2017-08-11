var chess = require('./chess')

var positions = [8, 7, 6, 5, 4, 3, 2, 1].reduce(function (acc, rank) {
  return acc.concat('abcdefgh'.split('').map(function (file) {
    return { rank: rank, file: file }
  }))
}, [])

module.exports = function (state) {
  var moveHistory = state.getMoveHistory()
  var game = chess.createGame(moveHistory)
  var gameStatus = game.getStatus()

  var moveSourcesIndex = chess.getMoveSourcesIndex(gameStatus)
  var destinationsIndex = state.activeSquare
    ? chess.getMoves(state.activeSquare, gameStatus)
    : {}
  var history = game.game.moveHistory
  var lastMove = history.length > 0
    ? history[history.length - 1]
    : null

  function isSquareActive (pos) {
    return chess.isSameSquare(state.activeSquare, pos)
  }

  function isSquareEnabled (pos) {
    var loc = pos.file + pos.rank
    if (!state.activeSquare) {
      return Boolean(moveSourcesIndex[loc])
    }
    return isSquareActive(pos) || !!destinationsIndex[loc]
  }

  function isRecentMove (pos) {
    if (lastMove === null) { return false }
    return chess.isSameSquare(pos, { file: lastMove.prevFile, rank: lastMove.prevRank }) ||
      chess.isSameSquare(pos, { file: lastMove.postFile, rank: lastMove.postRank })
  }

  return {
    activeSquare: state.activeSquare,
    activeModal: state.activeModal,
    activeTheme: state.activeTheme,
    capturedPieces: chess.getCapturedPieces(game),
    currentSide: game.game.getCurrentSide().name,
    isCheck: game.isCheck,
    isCheckmate: game.isCheckmate,
    move: state.move,
    moveHistory: moveHistory,
    nextMoves: state.nextMoves,
    squares: positions.map(function (pos) {
      var square = chess.getBoardSquare(pos.file, pos.rank, gameStatus)

      return {
        file: pos.file,
        rank: pos.rank,
        color: chess.getSquareColor(pos.file, pos.rank),
        piece: square.piece,
        isActive: isSquareActive(pos),
        isEnabled: isSquareEnabled(pos),
        isRecent: isRecentMove(pos)
      }
    })
  }
}
