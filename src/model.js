var State = require('./state')

module.exports = function (opts) {
  return function (state, emitter) {
    function createPreferencesObject () {
      return {
        version: 1,
        theme: state.state.activeTheme
      }
    }

    state.state = State({
      activeTheme: (opts.preferences && opts.preferences.theme)
        ? opts.preferences.theme
        : undefined
    })

    emitter.on('*', function () {
      var args = Array.prototype.slice.call(arguments)
      var action = args[0]
      var actionArgs = args.slice(1)
      var newState

      switch (action) {
        case 'closeModal':
          state.state = state.state.showModal(null)
          break

        default:
          if (state.state[action]) {
            newState = state.state[action].apply(state.state, actionArgs)
            if (newState !== state.state) {
              state.state = newState
              emitter.emit('render')
            }
          }
      }

      if (action === 'setTheme') {
        opts.savePreferences(createPreferencesObject())
      }
    })
  }
}
