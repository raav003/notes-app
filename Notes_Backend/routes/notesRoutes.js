const express = require('express')
const catchAsync = require('../utils/catchAsync')
const router = express.Router()
const controller = require('../controllers/notesController')
// router.use((req,res,next)=>{
//     console.log("In route");
//     next()
// })

router.get('/',catchAsync(controller.getNotesData))
router.post('/',catchAsync(controller.addNote))
router.put('/:id',catchAsync(controller.editNote))
router.delete('/:id/:lastRecordId',catchAsync(controller.deleteNote))

// router.use('/*',(req,res)=>{res.status(404).send('route not found')})
// router.use((req, res) => {
//   res.status(404).send('Route not found');
// });
module.exports = router