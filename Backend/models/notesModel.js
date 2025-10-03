const fs = require('fs')
const path = require('path')
const notesFile = path.join(__dirname, '../data/notes.json')
const { v4: uuidv4 } = require('uuid')

exports.getAllNotes = () => {
    const data = fs.readFileSync(notesFile, 'utf8')
    try {
        return JSON.parse(data)
    } catch {
        return []
    }
}

exports.addNotes = (note) => {
    let notes = []
    const data = fs.readFileSync(notesFile, 'utf8')
    try {
        notes = JSON.parse(data);
    } catch {
        const notes = [];
    }
    const isDuplicate = notes.find((ele) => ele.Title == note.Title)
    if (!!isDuplicate) {
        throw new Error('Duplicate record')
    }
    note.id = uuidv4();
    notes.push(note);
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2))
}

exports.updateNote = (id, body) => {
    let notes = []
    const data = fs.readFileSync(notesFile, 'utf-8')
    try {
        notes = JSON.parse(data)
    } catch (err) {
        notes = []
    }
    const noteIndex = notes.findIndex((ele) => ele.id === id)
    if (noteIndex === -1) {
        throw new Error("No record found")
    }
    notes[noteIndex] = { ...body }
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2))
    return notes[noteIndex]
}

exports.deleteNote = (id) => {
    const data = fs.readFileSync(notesFile,"utf-8")
    let notes = JSON.parse(data)
    try{
        const deleteIndex = notes.findIndex((ele)=>ele.id == id)
        if(deleteIndex == -1){
            throw new Error("Data not found")
        }
        notes.splice(deleteIndex,1)
        fs.writeFileSync(notesFile,JSON.stringify(notes,null,2))
        return deleteIndex
    }
    catch(err){
        throw new Error(err)
    }
}
