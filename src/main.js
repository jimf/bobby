var choo = require('choo')

var app = choo()
window.app = app
app.route('*', require('./views/app'))
app.use(require('./model')({
  addBodyClass: function (className) {
    document.body.classList.add(className)
  },
  removeBodyClass: function (className) {
    document.body.classList.remove(className)
  }
}))
app.mount('#app')
