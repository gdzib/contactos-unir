var Usuario = require('../Models/Usuario')
var swig = require("swig")

var vistaController = {
    todos: (req, res) => {
        Usuario.find().then((usuariosBuscados) => {
            //  return res.status(200).send(usuariosBuscados)
            //console.log(usuariosBuscados);

            var respuesta = swig.renderFile("public_html/plantillas/usuarios.html",{titulo:"Usuarios",usuarios:usuariosBuscados});
            res.status(200).send(respuesta);

        }).catch((err) => {
            console.error(err)
            return res.status(500).send('Error al obtener los usuarios.')
        })
    },
    buscar: (req, res) => {
        var id = req.params.id

        Usuario.findById(id).then((usuarioBuscado) => {
            if (!usuarioBuscado) {
                return res.status(404).send('Usuario inexistente.')
            }
            //return res.status(200).send(usuarioBuscado)

            var respuesta = swig.renderFile("public_html/plantillas/muestraBuscar.html",{titulo: "Usuario Encontrado", usuario: usuarioBuscado});
            res.status(200).send(respuesta);

        }).catch((err) => {
            console.error(err)
            return res.status(500).send('Error al buscar al usuario.')
        })
    },
    crear: (req, res) => {
        var params = req.body
        var usuario = new Usuario()

        usuario.nombre = params.nombre
        usuario.apellido = params.apellido
        usuario.telefono = params.telefono
        usuario.email = params.email
        usuario.edad = params.edad

        usuario.save().then((usuarioCreado) => {
            console.log(usuarioCreado);
            return res.status(201).send("Usuario Creado Exitosamente");
        }).catch((err) => {
            if (err) return res.status(500).send('Error al crear el usuario.')
        })
    },
    actualizar: (req, res) => {
        var id = req.params.id
        var params = req.body

        //console.log(id,params);

        Usuario.findByIdAndUpdate(id, params, {new: true}).then((usuarioActualizado) => {
            if (!usuarioActualizado) {
                return res.status(404).send('Usuario inexistente.')
            }
            return res.status(204).send(usuarioActualizado) // No regresa nada por el status 204 pero si funciona
            //return res.status(204).send("Usuario actualizado Exitosamente") // No regresa nada por el status 204 pero si funciona
        }).catch((err) => {
            console.error(err)
            return res.status(500).send('Error al actualizar al usuario.')
        })
    },
    eliminar: (req, res) => {
        var id = req.params.id

        Usuario.findByIdAndDelete(id).then((usuarioEliminado) => {
            if (!usuarioEliminado) {
                return res.status(404).send('Usuario inexistente.')
            }
            console.log(usuarioEliminado)
            return res.status(204).send(usuarioEliminado) // No regresa nada por el status 204 pero si funciona
        }).catch((err) => {
            console.error(err)
            return res.status(500).send('Error al eliminar al usuario.')
        })
    }
}

module.exports = vistaController
