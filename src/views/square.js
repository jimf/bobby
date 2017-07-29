var html = require('choo/html')
var cx = require('classnames')
var piece = require('./chess_piece')

module.exports = function (props) {
  var className = cx('board__square', {
    'board__square--is-active': props.isActive,
    'board__square--is-recent': props.isRecent
  })

  function handleClick () {
    props.emit('clickSquare', { rank: props.rank, file: props.file })
  }

  return html`
    <div class="${className}">
      <button type="button" class="board__square-button" onclick=${handleClick} disabled="${props.disabled}">
        ${props.piece === null ? '' : piece(props.piece)}
      </button>
    </div>
  `
}
