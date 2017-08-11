var chess = require('./chess')
var defaultOptions = {
  previousMoves: [],
  move: null,
  nextMoves: [],
  activeModal: null,
  activeSquare: null,
  activeTheme: 'default'
}

function getOption (opt, opts, defaults) {
  return opts[opt] !== undefined ? opts[opt] : defaults[opt]
}

function State (opts) {
  if (!(this instanceof State)) {
    return new State(opts)
  }

  opts = opts || {}

  Object.keys(defaultOptions).forEach(function (opt) {
    this[opt] = getOption(opt, opts, defaultOptions)
  }, this)
}

State.prototype.toJSON = function toJSON () {
  return {
    previousMoves: this.previousMoves,
    move: this.move,
    nextMoves: this.nextMoves,
    activeSquare: this.activeSquare,
    activeModal: this.activeModal,
    activeTheme: this.activeTheme
  }
}

State.prototype.extend = function (opts) {
  return new State({
    previousMoves: getOption('previousMoves', opts, this),
    move: getOption('move', opts, this),
    nextMoves: getOption('nextMoves', opts, this),
    activeSquare: getOption('activeSquare', opts, this),
    activeModal: getOption('activeModal', opts, this),
    activeTheme: getOption('activeTheme', opts, this)
  })
}

/**
 * Return current move history.
 *
 * @return {string[]}
 */
State.prototype.getMoveHistory = function () {
  return this.previousMoves.concat(this.move ? [this.move] : [])
}

/**
 * Action handler for clicking a square. Toggles active state of squares and
 * handles piece movement.
 *
 * @param {object} pos File/rank object
 * @return {State}
 */
State.prototype.clickSquare = function clickSquare (pos) {
  if (this.activeSquare === null) {
    return this.extend({ activeSquare: pos })
  } else if (chess.isSameSquare(this.activeSquare, pos)) {
    return this.extend({ activeSquare: null })
  }

  var previousMoves = this.getMoveHistory()
  var game = chess.createGame(previousMoves)
  var availableMoves = chess.getMoves(this.activeSquare, game.getStatus())
  var move = game.move(availableMoves[pos.file + pos.rank])

  return this.extend({
    previousMoves: previousMoves,
    move: move.move.algebraic,
    nextMoves: [],
    activeSquare: null
  })
}

/**
 * Load state from a string of moves.
 *
 * @param {string} moveList Move history in string form
 * @return {State}
 */
State.prototype.loadMoveList = function loadMoveList (moveList) {
  var moveHistory = moveList.trim().split('\n').map(function (line) {
    return line.trim().replace(/^\d+\. /, '')
  }).join(' ').split(' ')
  var game = chess.createGame(moveHistory)

  if (!game) { return this }

  return this.extend({
    previousMoves: moveHistory.slice(0, -1),
    move: moveHistory[moveHistory.length - 1],
    nextMoves: []
  })
}

/**
 * Set the active theme.
 *
 * @param {string} theme Theme to mark as active
 * @return {State}
 */
State.prototype.setTheme = function setTheme (theme) {
  return theme === this.activeTheme
    ? this
    : this.extend({ activeTheme: theme })
}

/**
 * Show the given modal, or pass null to close the active modal.
 *
 * @param {string|null} modal Modal to show
 * @return {State}
 */
State.prototype.showModal = function showModal (modal) {
  return modal === this.activeModal
    ? this
    : this.extend({ activeModal: modal })
}

/**
 * Undo the last move.
 *
 * @return {State}
 */
State.prototype.undoMove = function undoMove () {
  if (!this.move) { return this }

  return this.extend({
    previousMoves: this.previousMoves.slice(0, -1),
    move: this.previousMoves[this.previousMoves.length - 1] || null,
    nextMoves: [this.move].concat(this.nextMoves)
  })
}

State.prototype.redoMove = function redoMove () {
  if (this.nextMoves.length === 0) { return this }

  return this.extend({
    previousMoves: this.getMoveHistory(),
    move: this.nextMoves[0],
    nextMoves: this.nextMoves.slice(1)
  })
}

module.exports = State
