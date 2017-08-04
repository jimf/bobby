var html = require('choo/html')
var picoModal = require('picomodal')
var _ = require('../util')

module.exports = function (props, emit) {
  var moves = _.chunksOf(2, props.game.game.moveHistory)
    .map(function (move, idx) {
      return (idx + 1) + '. ' + move[0].algebraic + (move[1] ? (' ' + move[1].algebraic) : '')
    })
    .join('\n')
  var modal

  function handleFocus (e) {
    e.target.select()
  }

  modal = picoModal(html`
    <div>
      <label for="move-history-textarea">
        Copy & paste move history to send to a friend
      </label>

      <textarea onfocus=${handleFocus} readonly=${true}>${moves}</textarea>
    </div>
  `).afterClose(function () {
    emit('closeModal')
    modal.destroy()
  }).show()

  return modal
}
