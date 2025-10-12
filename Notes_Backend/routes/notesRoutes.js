const express = require('express')
const router = express.Router()
const controller = require('../controllers/notesController')

// router.use((req,res,next)=>{
//     console.log("In route");
//     next()
// })

router.get('/',controller.getNotesData)
router.post('/',controller.addNote)
router.put('/:id',controller.editNote)
router.delete('/:id',controller.deleteNote)

// router.use('/*',(req,res)=>{res.status(404).send('route not found')})
// router.use((req, res) => {
//   res.status(404).send('Route not found');
// });
module.exports = router