const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Data: { type: String },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Note',notesSchema)