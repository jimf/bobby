var choo = require('choo')

var app = choo()
app.route('*', require('./views/app'))
app.use(require('./model'))
app.mount('#app')
