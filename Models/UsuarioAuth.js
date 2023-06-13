var mongoose = require('mongoose')

var UsuarioAuth = mongoose.model('UsuarioAuth', {
    email: String,
    password: String,
    token: String,
})

module.exports = UsuarioAuth
