var html = require('choo/html')

module.exports = function (props) {
  function renderMove (move) {
    return html`<li>${move.algebraic}</li>`
  }

  return html`
    <section class="game-info">
      <header class="game-info__header">
        <ul>
          <li><strong>${props.game.game.getCurrentSide().name}</strong> to move</li>
        </ul>
      </header>
      <main>
        <ol class="game-info__move-history">
          ${props.game.game.moveHistory.map(renderMove)}
        </ol>
      </main>
    </section>
  `
}
