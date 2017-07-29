var html = require('choo/html')
var _ = require('../util')

module.exports = function (props) {
  function renderMove (move, idx) {
    return html`
      <tr>
        <td>${idx + 1}.</td>
        <td>${move[0].algebraic}</td>
        <td>${move[1] ? move[1].algebraic : ''}</td>
      </tr>
    `
  }

  return html`
    <section class="game-info">
      <header class="game-info__header">
        <div>
          <strong>${props.game.game.getCurrentSide().name}</strong> to move
        </div>
      </header>
      <main class="game-info__main">
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
      </footer>
    </section>
  `
}
