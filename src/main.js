var choo = require('choo')

var app = choo()
var prefs = window.localStorage.getItem('bobby')
prefs = prefs && JSON.parse(prefs)

app.route('*', require('./views/app'))
app.use(require('./model')({
  preferences: prefs,
  savePreferences: function (prefs) {
    window.localStorage.setItem('bobby', JSON.stringify(prefs))
  }
}))
app.mount('#app')
