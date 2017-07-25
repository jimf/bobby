var html = require('choo/html')
var board = require('./board')

module.exports = function (state, emit) {
  return html`
    <div id="app">
      <section>
        <header></header>
        <main>
          ${board({ game: state.game, emit: emit })}
        </main>
        <footer></footer>
      </section>
    </div>
  `
}
