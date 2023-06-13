var jwt = require('jsonwebtoken')

var validarToken = (req, res, next) => {
    try {
        var token = req.headers['x-access-token'] || req.body.token || req.query.token

        if (!token) {
            return res.status(403).send('Se requiere un token de autenticación')
        }

        var tokenDecodificado = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = tokenDecodificado
        console.log(req.user)
    } catch (err) {
        console.error(err)
        return res.status(500).send('Error al validar el token.')
    }
    return next()
}

module.exports = validarToken
