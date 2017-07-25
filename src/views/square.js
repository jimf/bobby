var html = require('choo/html')
var piece = require('./chess_piece')

module.exports = function (props) {
  return html`
    <div class="board__square">
      ${props.piece === null ? '' : piece(props.piece)}
    </div>
  `
}
