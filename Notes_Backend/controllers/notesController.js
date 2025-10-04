const notesModel = require('../models/notesModel')

exports.getNotes = (req, res) => {
    const notes = notesModel.getAllNotes();
    res.json(notes)
}

exports.createNote = (req, res) => {
    try {
        const newNote = req.body
        notesModel.addNotes(newNote)
        // const allNotes = notesModel.getAllNotes()
        res.status(201).json({ message: 'Note added successfully', note: newNote })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.editNote = (req,res)=>{
    const id = req.params.id
    const reqBody = req.body
    try{
        const updatedNote = notesModel.updateNote(id,reqBody)
        res.status(200).json({updatedNote})
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.deleteNote = (req,res) =>{
    const id = req.params.id;
    try{
        const deletedNote = notesModel.deleteNote(id)
        res.status(200).json({id})
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}