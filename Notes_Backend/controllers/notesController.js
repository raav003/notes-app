const notesModel = require('../model/notesModel')

exports.getNotesData = async (req, res,next) => {
    try {
        const filter = {}
        filter.Views={}
        if(req.query.Published){
            filter.Published = Boolean(req.query.Published)
        }
        if(req.query.maxViews){
            filter.Views.$lt = Number(req.query.maxViews)
        }
        if(req.query.minViews){
            filter.Views.$gt=Number(req.query.minViews)
        }
        const notesData = await notesModel.find(filter)
        res.status(200).json(notesData)
    } catch (err) {
        // res.status(400).json({ "error": err.message })
        next(err)
    }
}

exports.addNote = async (req, res,next) => {
    if(!req.body.Title || !req.body.Data){
        next({message:`${!req.body.Title?'Title':'Data'} is required`,status:400})
    }
    const { Title, Data } = req.body
    const notesData = new notesModel({ Title, Data })
    try {
        const savedNote = await notesData.save();
        res.status(201).json({ message: 'Note added', note: savedNote })
    }
    catch (err) {
        // res.status(400).json({ 'error': err.message })
        next(err)
    }
}

exports.editNote = async (req, res,next) => {
    const id = req.params.id
    try {
        const { Title, Data } = req.body
        const updateNote = await notesModel.findByIdAndUpdate(id, { Title, Data }, { new: true,runValidators:true })
        res.status(200).json({ updatedNote: updateNote })
    }
    catch (err) {
        // res.status(400).json({ 'Error': err.message })
        err.status = 400
        next(err)
    }
}

exports.deleteNote = async (req, res,next) => {
    const id = req.params.id
    try {
        const deletedNote = await notesModel.findByIdAndDelete(id)
        res.status(200).json({ deletedNote: deletedNote })
    }
    catch (err) {
        // res.status(400).json({ 'Error': err.message })
        err.status = 400
        next(err)
    }
}