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
  var destinationsIndex = props.activeSquare
    ? _.getMoves(props.activeSquare, gameStatus)
    : {}

  function isSquareActive (pos) {
    return _.isSameSquare(props.activeSquare, pos)
  }

  function isSquareEnabled (pos) {
    var loc = pos.file + pos.rank
    if (!props.activeSquare) {
      return Boolean(moveSourcesIndex[loc])
    }
    return isSquareActive(pos) || !!destinationsIndex[pos.file + pos.rank]
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
