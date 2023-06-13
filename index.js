require('dotenv').config() // Para que funcionen las variables de entorno
var express = require('express')
var mongoose = require('mongoose')
var routesApi = require('./routes/api')
var routesTracks = require('./routes/tracks')
var routesAuth = require('./routes/auth')

var app = express()
var port = 3000

// Middleware
app.use(express.urlencoded())

// Base de datos
mongoose.connect('mongodb://127.0.0.1:27017/contactos')
    .then(() => console.log('conexión con MongoDB ok'))
    .catch((err) => console.log(err))

// Rutas API
app.use('/api', routesApi) // Para cambiar la raíz del API e incluir las rutas
app.use('/api', routesTracks)

// Rutas Auth
app.use('/auth', routesAuth) // Para cambiar la raíz del Auth

// Rutas front
app.get('/', (req, res) => {
    res.status(200).send('Prueba de que funciona el front.')
})
app.get('*', (req, res) => {
    res.status(404).send('Página inexistente.')
})

app.listen(port, () => {
    console.log('Iniciando...')
})
