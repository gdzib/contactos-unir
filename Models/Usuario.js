var mongoose = require('mongoose')

var Usuario = mongoose.model('Usuario', {
    nombre: String,
    apellido: String,
    telefono: String,
    email: String,
    edad: Number,
})

module.exports = Usuario
