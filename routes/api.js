var express = require('express')

var router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('Prueba de que funciona el API.')
})

router.get('*', (req, res) => {
    res.status(404).send('Ruta inexistente.')
})

module.exports = router
