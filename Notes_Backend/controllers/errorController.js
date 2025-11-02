const errorHandler = (err,res) => {
    // if(err.isOperational){
        res.status(err.statusCode??500).json({'error':err.message??'Internal Server Error','status':err.status??"Error"})
    // }else{
    //     res.status(500).json({'error':'Internal Server Error'})
    // }
}

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'Error'
    errorHandler(err,res)
}