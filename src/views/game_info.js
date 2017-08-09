var html = require('choo/html')
var _ = require('../util')
var c = require('../constants')

function stringifyCaptured (side, captured) {
  return _.times(captured[side].queen, _.K(c.symbols[side + 'queen']))
    .concat(_.times(captured[side].rook, _.K(c.symbols[side + 'rook'])))
    .concat(_.times(captured[side].knight, _.K(c.symbols[side + 'knight'])))
    .concat(_.times(captured[side].bishop, _.K(c.symbols[side + 'bishop'])))
    .concat(_.times(captured[side].pawn, _.K(c.symbols[side + 'pawn'])))
    .join('')
}

module.exports = function (props, emit) {
  function renderMove (move, idx) {
    return html`
      <tr>
        <td>${idx + 1}.</td>
        <td>${move[0].algebraic}</td>
        <td>${move[1] ? move[1].algebraic : ''}</td>
      </tr>
    `
  }

  function renderCapturedPieces () {
    var captured = _.getCapturedPieces(props.game)
    var white = stringifyCaptured('white', captured)
    var black = stringifyCaptured('black', captured)

    return html`
      <div>
        <div>${white}</div>
        <div>${black}</div>
      </div>
    `
  }

  function handleConfigureClick () {
    emit('showConfigureModal')
  }

  function handleLoadGameClick () {
    emit('showLoadGameModal')
  }

  function handleCopyGameClick () {
    emit('showCopyMovesModal')
  }

  return html`
    <section class="game-info">
      <header class="game-info__header">
        <div>
          <strong>${props.game.game.getCurrentSide().name}</strong> to move${props.game.getStatus().isCheck ? ' (check!)' : ''}
        </div>
      </header>
      <main class="game-info__main">
        ${renderCapturedPieces()}
        <table class="game-info__move-history">
          <thead>
            <tr><th>move</th><th>white</th><th>black</th></tr>
          </thead>
          <tbody>
            ${_.chunksOf(2, props.game.game.moveHistory).map(renderMove)}
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
      </footer>
    </section>
  `
}
