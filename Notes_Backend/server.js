const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
const DB = require('./data/db')

app.use(cors())
app.use(express.json())
// app.use(express.static('public'))

DB.connectDB();

const notesRoutes = require('./routes/notesRoutes')

// app.use((req, res, next) => {
//     console.log("1");
//     next()
// })
// app.use((req, res, next) => {
//     console.log("2");
//     next()
// })
app.use('/notes', notesRoutes)
// app.use((err,req, res,next) => res.status(404).send('Route not found'))

app.use((req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.status = 400;
  next(error)
// res.status(error.status).json({'Error':error})
});

app.use((err, req, res, next) => {
    // if (err.status === 404) {
    //     res.status(404).send(err.message);
    // } else {
        // next(err);
    res.status(err.status).json({'Error':err.message})
    // }
});

app.listen(port, () => {
    console.log('Server is running on', port);
})