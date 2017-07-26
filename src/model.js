var chess = require('chess')

module.exports = function (state, emitter) {
  state.game = chess.create()
  state.activeSquare = null

  emitter.on('clickSquare', function (pos) {
    if (state.activeSquare === null) {
      state.activeSquare = pos
      emitter.emit('render')
    } else if (state.activeSquare.rank === pos.rank && state.activeSquare.file === pos.file) {
      state.activeSquare = null
      emitter.emit('render')
    }
  })
}
