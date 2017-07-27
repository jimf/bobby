var chess = require('chess')
var _ = require('./util')

module.exports = function (state, emitter) {
  state.game = chess.create()
  state.activeSquare = null

  emitter.on('clickSquare', function (pos) {
    var gameStatus = state.game.getStatus()
    var move = state.activeSquare &&
      _.getMoves(state.activeSquare, gameStatus)

    if (state.activeSquare === null) {
      state.activeSquare = pos
      emitter.emit('render')
    } else if (_.isSameSquare(state.activeSquare, pos)) {
      state.activeSquare = null
      emitter.emit('render')
    } else {
      state.game.move(move[pos.file + pos.rank])
      state.activeSquare = null
      emitter.emit('render')
    }
  })
}
