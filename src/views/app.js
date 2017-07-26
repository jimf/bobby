var html = require('choo/html')
var board = require('./board')

module.exports = function (state, emit) {
  return html`
    <div id="app">
      <section>
        <header></header>
        <main>
          ${board(state, emit)}
        </main>
        <footer></footer>
      </section>
    </div>
  `
}
