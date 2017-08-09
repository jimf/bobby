var html = require('choo/html')
var picoModal = require('picomodal')

module.exports = function (props, emit) {
  function handleThemeChange (e) {
    emit('setTheme', e.target.value)
  }

  function renderThemeOption (theme) {
    return html`
      <option value="${theme.value}" selected=${theme.value === props.activeTheme}>
        ${theme.label}
      </option>
    `
  }

  var modal = picoModal(html`
    <div>
      <label>
        <span>Theme</span>
        <select onchange=${handleThemeChange}>
          ${props.themes.map(renderThemeOption)}
        </select>
      </label>
    </div>
  `).afterClose(function () {
    emit('closeModal')
    modal.destroy()
  }).show()

  return modal
}
