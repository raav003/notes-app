const errorHandler = (err,res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({'error':err.message,'status':err.status})
    }else{
        res.status(500).json({'error':'Internal Server Error'})
    }
}

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'Error'
    errorHandler(err,res)
}