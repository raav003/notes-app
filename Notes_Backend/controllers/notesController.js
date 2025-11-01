const notesModel = require('../model/notesModel')
const mongoose = require('mongoose')
const AppError = require('../utils/error')

exports.getNotesData = async (req, res, next) => {
    try {
        const filter = {}

        // if (req.query.Published) {
        //     filter.Published = Boolean(req.query.Published)
        // }
        // if (req.query.maxViews || req.query.minViews) {
        //     filter.Views = {}
        //     if (req.query.maxViews) {
        //         filter.Views.$lt = Number(req.query.maxViews)
        //     }
        //     if (req.query.minViews) {
        //         filter.Views.$gt = Number(req.query.minViews)
        //     }
        // }
        const limit = Number(req.query.limit)
        const pageNo = Number(req.query.pageNo)
        let skip = 0
        if (req.query.skip) {
            skip = Number(req.query.skip)
        } else {
            skip = (pageNo - 1) * limit
        }
        const totalCount = await notesModel.countDocuments()
        const notesData = await notesModel.find(filter)
            .limit(limit)
            .skip(skip)
            .sort({ 'createdAt': -1 })
        res.status(200).json({ notesData: notesData, totalCount: totalCount })
    } catch (err) {
        // res.status(400).json({ "error": err.message })
        // if (err.status) {
        //     next(err)
        // }else{
        //     err.status =400
        //     next(err)
        // }
        next(err)
    }
}

exports.addNote = async (req, res, next) => {
    if (!req.body.Title || !req.body.Data) {
        // next({ message: `${!req.body.Title ? 'Title' : 'Data'} is required`, status: 400 })
        throw new AppError(`${!req.body.Title ? 'Title' : 'Data'} is required`,400)
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

exports.editNote = async (req, res, next) => {
    const id = req.params.id
    try {
        const { Title, Data } = req.body
        const updateNote = await notesModel.findByIdAndUpdate(id, { Title, Data }, { new: true, runValidators: true })
        res.status(200).json({ updatedNote: updateNote })
    }
    catch (err) {
        // res.status(400).json({ 'Error': err.message })
        // err.status = 400
        next(err)
    }
}

exports.deleteNote = async (req, res, next) => {
    const id = req.params.id
    const lastRecordId = req.params.lastRecordId
    try {
        const deletedNote = await notesModel.findByIdAndDelete(id)
        const nextNote = await notesModel.findOne({_id:{$lt:new mongoose.Types.ObjectId(lastRecordId)}}).sort({_id:'desc'})
        res.status(200).json({ lastNote: nextNote })
    }
    catch (err) {
        // res.status(400).json({ 'Error': err.message })
        // err.status = 400
        next(err)
    }
}