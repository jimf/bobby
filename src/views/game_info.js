var html = require('choo/html')
var _ = require('../util')
var c = require('../constants')

function stringifyPiece (side, piece, count) {
  if (count === 0) {
    return ''
  } else if (count <= 2) {
    return _.times(count, _.K(c.symbols[side + piece])).join('')
  }
  return c.symbols[side + piece] + '×' + count
}

function stringifyCaptured (side, captured) {
  return ['queen', 'rook', 'knight', 'bishop', 'pawn'].reduce(function (acc, piece) {
    return acc + stringifyPiece(side, piece, captured[side][piece])
  }, '')
}

module.exports = function (props, emit) {
  function renderHeader () {
    return html`
      <header class="game-info__header">
        ${props.isCheckmate
          ? html`<div><strong>${props.currentSide === 'white' ? 'black' : 'white'}</strong> wins!</div>`
          : html`<div><strong>${props.currentSide}</strong> to move${props.isCheck ? ' (check!)' : ''}</div>`
        }
      </header>
    `
  }

  function renderMove (move, idx) {
    return html`
      <tr>
        <td>${idx + 1}.</td>
        <td>${move[0]}</td>
        <td>${move[1] ? move[1] : ''}</td>
      </tr>
    `
  }

  function renderCapturedPieces () {
    var white = stringifyCaptured('white', props.capturedPieces)
    var black = stringifyCaptured('black', props.capturedPieces)

    return html`
      <div class="game-info__captured-pieces">
        <div>${white}</div>
        <div>${black}</div>
      </div>
    `
  }

  function handleConfigureClick () {
    emit('showModal', 'configure')
  }

  function handleLoadGameClick () {
    emit('showModal', 'loadGame')
  }

  function handleCopyGameClick () {
    emit('showModal', 'copyMoves')
  }

  function handleUndoClick () {
    emit('undoMove')
  }

  function handleRedoClick () {
    emit('redoMove')
  }

  return html`
    <section class="game-info">
      ${renderHeader()}
      <main class="game-info__main">
        ${renderCapturedPieces()}
        <table class="game-info__move-history">
          <thead>
            <tr><th>move</th><th>white</th><th>black</th></tr>
          </thead>
          <tbody>
            ${_.chunksOf(2, props.moveHistory).map(renderMove)}
          </tbody>
        </table>
      </main>
      <footer class="game-info__footer">
        <button type="button" class="button-icon" onclick=${handleLoadGameClick} title="Load Game" aria-label="Load Game">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
        <button type="button" class="button-icon" onclick=${handleCopyGameClick} title="Copy Moves" aria-label="Copy Moves">
          <i class="fa fa-download" aria-hidden="true"></i>
        </button>
        <button type="button" class="button-icon" onclick=${handleConfigureClick} title="Configure" aria-label="Configure">
          <i class="fa fa-cog" aria-hidden="true"></i>
        </button>
        <button type="button" class="button-icon" onclick=${handleUndoClick} title="Configure" aria-label="Undo" disabled=${!props.move}>
          <i class="fa fa-undo" aria-hidden="true"></i>
        </button>
        <button type="button" class="button-icon" onclick=${handleRedoClick} title="Configure" aria-label="Redo" disabled=${props.nextMoves.length === 0}>
          <i class="fa fa-repeat" aria-hidden="true"></i>
        </button>
      </footer>
    </section>
  `
}
