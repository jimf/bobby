var choo = require('choo')
var debounce = require('lodash.debounce')

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

function getWindowAspectRatio () {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  return w / h
}

function updateIsTall () {
  var aspectRatio = getWindowAspectRatio()
  if (aspectRatio < 1.34) {
    document.body.classList.add('is-tall')
  } else {
    document.body.classList.remove('is-tall')
  }
}

updateIsTall()
window.addEventListener('resize', debounce(updateIsTall))
