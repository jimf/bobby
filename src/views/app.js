var html = require('choo/html')
var board = require('./board')
var gameInfo = require('./game_info')

module.exports = function (state, emit) {
  return html`
    <div id="app">
      <section>
        <header></header>
        <main>
          <div class="col">${board(state, emit)}</div>
          <div class="col">${gameInfo(state)}</div>
        </main>
        <footer></footer>
      </section>
    </div>
  `
}
