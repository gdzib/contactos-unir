var express = require('express')
var vistaController = require('../Controllers/VistaController')
var auth = require('../Middlewares/auth')

var router = express.Router()

// Usuarios
router.get('/usuarios', vistaController.todos)
router.get('/usuarios/:id', vistaController.buscar)
router.post('/usuarios', vistaController.crear)
router.put('/usuarios/:id', vistaController.actualizar)
router.delete('/usuarios/:id', auth, vistaController.eliminar)



// router.get('/', (req, res) => {
//     res.status(200).send('Prueba de que funciona el API.')
// })
// router.get('*', (req, res) => {
//     res.status(404).send('Ruta inexistente.')
// })

module.exports = router
