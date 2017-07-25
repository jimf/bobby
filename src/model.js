var chess = require('chess')

module.exports = function (state) {
  state.game = chess.create()
}
