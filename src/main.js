var choo = require('choo')

document.body.classList.add('theme-default')
var app = choo()
app.route('*', require('./views/app'))
app.use(require('./model')())
app.mount('#app')
