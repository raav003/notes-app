const express=require('express')
const router=express.Router()
const notesController=require('../controllers/notesController')

router.get('/',notesController.getNotes);
router.post('/',notesController.createNote);
router.put('/:id',notesController.editNote)
router.delete('/:id',notesController.deleteNote)

module.exports = router