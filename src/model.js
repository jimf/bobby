var chess = require('chess')
var _ = require('./util')

module.exports = function (state, emitter) {
  window.state = state
  state.game = chess.create()
  state.activeSquare = null
  state.showModal = false

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

  emitter.on('loadMoveList', function (moveList) {
    var isValid = true
    var moves = moveList.trim().split('\n').map(function (line) {
      return line.trim().replace(/^\d+\. /, '')
    }).join(' ').split(' ')
    var game = chess.create()

    moves.forEach(function (move) {
      if (!isValid) { return }
      try {
        game.move(move)
      } catch (e) {
        isValid = false
      }
    })

    if (isValid) {
      state.game = game
      state.showLoadGameModal = false
      emitter.emit('render')
    }
  })

  emitter.on('showCopyMovesModal', function () {
    state.showModal = 'copyMoves'
    emitter.emit('render')
  })

  emitter.on('showLoadGameModal', function () {
    state.showModal = 'loadGame'
    emitter.emit('render')
  })

  emitter.on('closeModal', function () {
    state.showModal = false
  })
}
