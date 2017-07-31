var html = require('choo/html')
var board = require('./board')
var gameInfo = require('./game_info')
var copyMovesModal = require('./copy_moves_modal')
var loadGameModal = require('./load_game_modal')

module.exports = function (state, emit) {
  return html`
    <div id="app">
      <section class="app-section">
        <header></header>
        <main>
          <div class="col">${board(state, emit)}</div>
          <div class="col">${gameInfo(state, emit)}</div>
          <div style="clear:both"></div>
        </main>
        <footer></footer>
      </section>
      ${state.showModal === 'copyMoves' ? copyMovesModal(state, emit) : ''}
      ${state.showModal === 'loadGame' ? loadGameModal(emit) : ''}
    </div>
  `
}
