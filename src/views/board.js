var html = require('choo/html')
var square = require('./square')
var _ = require('../util')

module.exports = function (props, emit) {
  function renderSquare (squareData) {
    return square(_.assign(
      {
        emit: emit,
        theme: props.theme
      },
      squareData
    ))
  }

  return html`
    <div class="board" style="border-color:${props.theme.blackSquare}">
      <div class="board__inner">
        ${props.squares.map(renderSquare)}
      </div>
    </div>
  `
}
