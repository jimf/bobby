var html = require('choo/html')

var symbols = {
  whiteking: '♔',
  whitequeen: '♕',
  whiterook: '♖',
  whitebishop: '♗',
  whiteknight: '♘',
  whitepawn: '♙',
  blackking: '♚',
  blackqueen: '♛',
  blackrook: '♜',
  blackbishop: '♝',
  blackknight: '♞',
  blackpawn: '♟'
}

module.exports = function (props) {
  return html`
    <span class="board__piece board__piece--is-${props.side.name}">
      ${symbols[props.side.name + props.type]}
    </span>
  `
}
