var html = require('choo/html')
var square = require('./square')
var _ = require('../util')

var positions = [8, 7, 6, 5, 4, 3, 2, 1].reduce(function (acc, rank) {
  return acc.concat('abcdefgh'.split('').map(function (file) {
    return { rank: rank, file: file }
  }))
}, [])

module.exports = function (props, emit) {
  var gameStatus = props.game.getStatus()
  var moveSourcesIndex = _.getMoveSourcesIndex(gameStatus)

  function isSquareActive (pos) {
    return Boolean(
      props.activeSquare &&
      props.activeSquare.rank === pos.rank &&
      props.activeSquare.file === pos.file
    )
  }

  function isSquareEnabled (pos) {
    if (!props.activeSquare) {
      return Boolean(moveSourcesIndex[pos.file + pos.rank])
    }
    return isSquareActive(pos)
  }

  function renderSquare (pos) {
    var squareData = _.getBoardSquare(pos.file, pos.rank, gameStatus)

    return square(_.assign(
      {
        disabled: !isSquareEnabled(pos),
        emit: emit,
        isActive: isSquareActive(pos)
      },
      squareData
    ))
  }

  return html`
    <div class="board">
      <div class="board__inner">
        ${positions.map(renderSquare)}
      </div>
    </div>
  `
}
