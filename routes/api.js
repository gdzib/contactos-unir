var express = require('express')
var UsuarioController = require('../Controllers/UsuarioController')

var router = express.Router()

// Usuarios
router.get('/usuarios', UsuarioController.todos)
router.get('/usuarios/:id', UsuarioController.buscar)
router.post('/usuarios', UsuarioController.crear)
router.put('/usuarios/:id', UsuarioController.actualizar)
router.delete('/usuarios/:id', UsuarioController.eliminar)

router.get('/', (req, res) => {
    res.status(200).send('Prueba de que funciona el API.')
})
router.get('*', (req, res) => {
    res.status(404).send('Ruta inexistente.')
})

module.exports = router
