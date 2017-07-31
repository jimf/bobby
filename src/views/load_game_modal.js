var html = require('choo/html')
var picoModal = require('picomodal')

module.exports = function (emit) {
  var modal

  function handleSubmit (e) {
    e.preventDefault()
    emit('loadMoveList', e.target.querySelector('#load-game-move-list').value)
    modal.close()
  }

  modal = picoModal(html`
    <div>
      <form onsubmit=${handleSubmit}>
        <label for="load-game-move-list">
          Paste moves to load an existing game
        </label>

        <textarea id="load-game-move-list" name="load-game-move-list"></textarea>
        <button type="submit">Load Game</button>
      </form>
    </div>
  `).afterClose(function () {
    emit('closeModal')
    modal.destroy()
  }).show()

  return modal
}
