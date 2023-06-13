var express = require('express')
var UsuarioAuthController = require('../Controllers/UsuarioAuthController')

var router = express.Router()

router.post('/registrar', UsuarioAuthController.registrar)
router.post('/login', UsuarioAuthController.login)

router.get('/', (req, res) => {
    res.status(200).send('Prueba de que funciona el Auth.')
})

module.exports = router
