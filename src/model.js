var chess = require('chess')
var _ = require('./util')

module.exports = function (opts) {
  return function (state, emitter) {
    function createPreferencesObject () {
      return {
        version: 1,
        theme: state.activeTheme
      }
    }

    state.game = chess.create()
    state.previousMoves = []
    state.move = null
    state.nextMoves = []
    state.activeSquare = null
    state.showModal = false
    state.themes = [
      { value: 'default', label: 'Default' },
      { value: 'chess-dot-com', label: 'Chess.com' }
    ]
    state.activeTheme = opts.preferences
      ? opts.preferences.theme
      : 'default'

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
        if (state.move) {
          state.previousMoves.push(state.move)
        }
        state.move = state.game.move(move[pos.file + pos.rank]).move.algebraic
        state.nextMoves = []
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
        state.previousMoves = game.game.moveHistory.slice(0, -1).map(function (move) {
          return move.algebraic
        })
        state.move = game.game.moveHistory[game.game.moveHistory.length - 1].algebraic
        state.nextMoves = []
        state.showModal = false
        emitter.emit('render')
      }
    })

    emitter.on('setTheme', function (theme) {
      opts.removeBodyClass('theme-' + state.activeTheme)
      state.activeTheme = theme
      opts.addBodyClass('theme-' + theme)
      opts.savePreferences(createPreferencesObject())
    })

    emitter.on('showConfigureModal', function () {
      state.showModal = 'configure'
      emitter.emit('render')
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

    emitter.on('undoMove', function () {
      if (!state.move) { return }
      var game = chess.create()
      state.nextMoves.unshift(state.move)
      state.move = state.previousMoves.pop() || null
      // TODO: eventually this should just be a render call
      state.previousMoves.concat(state.move ? [state.move] : []).forEach(function (move) {
        game.move(move)
      })
      state.game = game
      emitter.emit('render')
    })

    emitter.on('redoMove', function () {
      if (state.nextMoves.length === 0) { return }
      var game = chess.create()
      if (state.move) {
        state.previousMoves.push(state.move)
      }
      state.move = state.nextMoves.shift() || null
      // TODO: eventually this should just be a render call
      state.previousMoves.concat(state.move ? [state.move] : []).forEach(function (move) {
        game.move(move)
      })
      state.game = game
      emitter.emit('render')
    })

    emitter.emit('setTheme', state.activeTheme)
  }
}
