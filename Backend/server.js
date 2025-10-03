const express = require('express')
const app = express()
const cors =require('cors')

app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({extended:true}))

const notesRoute = require('./routes/notes')
app.use('/notes',notesRoute)

app.listen(3000,()=>{
    console.log("Server is running");
})