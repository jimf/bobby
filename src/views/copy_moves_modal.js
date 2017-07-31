var html = require('choo/html')
var picoModal = require('picomodal')

module.exports = function (props, emit) {
  var moves = props.game.game.moveHistory
    .map(function (move) { return move.algebraic })
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
