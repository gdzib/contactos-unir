var track = require('../Models/track')

var trackController = {
    todos: (req, res) => {
        track.find().then((tracksBuscados) => {
            return res.status(200).send(tracksBuscados)
        }).catch((err) => {
            console.error(err)
            return res.status(500).send('Error al obtener los tracks.')
        })
    },
    buscar: (req, res) => {
        var id = req.params.id

        track.findById(id).then((trackBuscado) => {
            if (!trackBuscado) {
                return res.status(404).send('Track inexistente.')
            }
            return res.status(200).send(trackBuscado)
        }).catch((err) => {
            console.error(err)
            return res.status(500).send('Error al buscar el track.')
        })
    },
    crear: (req, res) => {
        var params = req.body
        var track = new track()

        track.name = params.name
        track.album = params.album
        track.artist = params.artist


        track.save().then((trackCreado) => {
            return res.status(201).send(trackCreado)
        }).catch((err) => {
            if (err) return res.status(500).send('Error al ingresar el track.')
        })
    },
    actualizar: (req, res) => {
        var id = req.params.id
        var params = req.body

        track.findByIdAndUpdate(id, params, {new: true}).then((trackActualizado) => {
            if (!trackActualizado) {
                return res.status(404).send('Track inexistente.')
            }
            return res.status(204).send(trackActualizado) // No regresa nada por el status 204 pero si funciona
        }).catch((err) => {
            console.error(err)
            return res.status(500).send('Error al actualizar el track.')
        })
    },
    eliminar: (req, res) => {
        var id = req.params.id

        track.findByIdAndDelete(id).then((trackEliminado) => {
            if (!trackEliminado) {
                return res.status(404).send('Track inexistente.')
            }
            return res.status(204).send(trackEliminado) // No regresa nada por el status 204 pero si funciona
        }).catch((err) => {
            console.error(err)
            return res.status(500).send('Error al eliminar el track.')
        })
    }
}

module.exports = trackController
