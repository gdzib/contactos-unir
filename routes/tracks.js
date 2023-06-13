var express = require('express')
var trackController = require('../Controllers/trackController')

var router = express.Router()

// Tracks
router.get('/tracks', trackController.todos)
router.get('/tracks/:id', trackController.buscar)
router.post('/tracks', trackController.crear)
router.put('/tracks/:id', trackController.actualizar)
router.delete('/tracks/:id', trackController.eliminar)

router.get('/', (req, res) => {
    res.status(200).send('Prueba de que funciona el API.')
})
router.get('*', (req, res) => {
    res.status(404).send('Ruta inexistente.')
})

module.exports = router
