var html = require('choo/html')

module.exports = function (props) {
  return html`
    <svg class="board__piece board__piece--is-${props.side.name}">
      <use xlink:href="#${props.side.name}-${props.type}" />
    </svg>
  `
}
