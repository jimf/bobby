var html = require('choo/html')
var square = require('./square')
var _ = require('../util')

var positions = [8, 7, 6, 5, 4, 3, 2, 1].reduce(function (acc, rank) {
  return acc.concat('abcdefgh'.split('').map(function (file) {
    return { rank: rank, file: file }
  }))
}, [])

module.exports = function (props) {
  function renderSquare (pos) {
    return square(_.getBoardSquare(pos.file, pos.rank, props.game))
  }

  return html`
    <div class="board">
      <div class="board__inner">
        ${positions.map(renderSquare)}
      </div>
    </div>
  `
}
