const Note = require('../models/note');

//C
exports.createNote = async (req, res) => {
    try {
        const data_note = new Note(req.body);
        await data_note.save();
        res.send(data_note);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error creando la nota');
    }
}

//R
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error obteniendo las notas');
    }
}

exports.getNoteById = async(req, res) => {
    try {
        const data_note = await Note.findById(req.params.id)
        if(!data_note){
            res.status(404).json({msg: 'Nota no encontrada'});
        }

        res.json(data_note);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error encontrando la nota');
    }
}

//U
exports.updateNote = async (req, res) => {
    try {
        const {title, body, done} = req.body;
        let data_note = await Note.findById(req.params.id);

        if(!data_note){
            res.status(404).json({msg: 'No se encontraron coincidencias'});
        }

        data_note = await Note.findByIdAndUpdate(
            {_id: req.params.id},
            {title, body, done},
            {new: true}
        )
        res.json(data_note);
    } catch (error) {
        console.log(error); 
        res.status(500).send('Hubo un error actualizando la nota');
    }
}

//D
exports.deleteNote = async (req, res) => {
    try {
        let data_note = await Note.findById(req.params.id);
        if(!data_note){
            res.status(404).json({msg: 'No se encontraron coincidencias'});
        }
        await Note.findByIdAndDelete(req.params.id);
        res.json({msg: 'Nota eliminada con exito'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error eliminando la nota');
    }
}