var html = require('choo/html')
var c = require('../constants')

module.exports = function (props) {
  return html`
    <span class="board__piece board__piece--is-${props.side.name}">
      ${c.symbols[props.side.name + props.type]}
    </span>
  `
}
