var html = require('choo/html')
var board = require('./board')
var gameInfo = require('./game_info')
var configureModal = require('./configure_modal')
var copyMovesModal = require('./copy_moves_modal')
var loadGameModal = require('./load_game_modal')
var presenter = require('../presenter')

module.exports = function (state, emit) {
  var props = presenter(state.state)
  return html`
    <div id="app">
      <section class="app-section">
        <header></header>
        <main>
          <div class="col">${board(props, emit)}</div>
          <div class="col">${gameInfo(props, emit)}</div>
          <div style="clear:both"></div>
        </main>
        <footer></footer>
      </section>
      ${props.activeModal === 'configure' ? configureModal(props, emit) : ''}
      ${props.activeModal === 'copyMoves' ? copyMovesModal(props, emit) : ''}
      ${props.activeModal === 'loadGame' ? loadGameModal(emit) : ''}
    </div>
  `
}
