var html = require('choo/html')
var square = require('./square')
var _ = require('../util')

module.exports = function (props, emit) {
  function renderSquare (squareData) {
    return square(_.assign(
      {
        emit: emit
      },
      squareData
    ))
  }

  return html`
    <div class="board">
      <div class="board__inner">
        ${props.squares.map(renderSquare)}
      </div>
    </div>
  `
}
