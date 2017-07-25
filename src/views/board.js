var html = require('choo/html')
var square = require('./square')

function range (limit) {
  var result = []
  var i = 0
  while (i < limit) {
    result.push(i)
    i += 1
  }
  return result
}

module.exports = function (props) {
  var squares = props.game.getStatus().board.squares

  function renderSquare (index) {
    var x = index % 8
    var y = 7 - Math.floor(index / 8)
    return square(squares[8 * y + x])
  }

  return html`
    <div class="board">
      <div class="board__inner">
        ${range(64).map(renderSquare)}
      </div>
    </div>
  `
}
