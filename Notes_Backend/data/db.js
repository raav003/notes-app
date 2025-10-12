const mongoose = require('mongoose')
const username = encodeURIComponent('notes_user')
const password = encodeURIComponent('4lB38PPSt1w9j9IK')
const mongoURI = `mongodb+srv://${username}:${password}@notesapp.ez1p7cl.mongodb.net/?retryWrites=true&w=majority&appName=NotesApp`

exports.connectDB = async () => {
    try{
        await mongoose.connect(mongoURI ,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("MongoDB atlas connected successfully");
    }
    catch(err){
        console.log("Error:",err.message);
        process.exit(1)
    }
}