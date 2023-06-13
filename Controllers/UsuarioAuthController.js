var UsuarioAuth = require('../Models/UsuarioAuth')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

var UsuarioAuthController = {
    registrar: async (req, res) => {
        try {
            var {email, password} = req.body

            var usuarioExiste = await UsuarioAuth.findOne({email: email})
            if (usuarioExiste) {
                return res.status(409).send('Usuario existente. Iniciar sesión con sus credenciales')
            }

            var sal = await bcrypt.genSalt() // TODO: revisar que funcione así
            var hashedPassword = await bcrypt.hash(password, sal)

            var usuario = await UsuarioAuth.create({email: email, password: hashedPassword})

            var token = signToken(usuario._id, usuario.email)

            usuario.token = token

            res.status(201).send(usuario)
        } catch (err) {
            console.error(err)
            return res.status(500).send('Error al registrar al usuario.')
        }
    },
    login: async (req, res) => {
        try {
            var {email, password} = req.body

            var usuario = await UsuarioAuth.findOne({email: email})
            if (usuario && (await bcrypt.compare(password, usuario.password))) {
                var token = signToken(usuario._id, usuario.email)

                usuario.token = token

                res.status(201).send(usuario)
            } else {
                res.status(401).send('Credenciales inválidas')
            }
        } catch (err) {
            console.error(err)
            return res.status(500).send('Error al loguear al usuario.')
        }
    },
}

var signToken = (_id, email) => {
    var token = jwt.sign(
        {_id, email},
        process.env.TOKEN_KEY,
        {expiresIn: '30m'},
    )
    return token
}

module.exports = UsuarioAuthController
