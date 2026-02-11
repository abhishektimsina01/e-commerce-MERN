import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
const notFound = (req,res,next) =>{
    const err = new Error(`${req.method} method for ${req.url} is not found`)
    err.status = 404
    next(err)
}

const errorHandler = (err, req,res,next) =>{
    const message = err.message
    const status = err.status || 400
    console.log(err)
    res.json({
        error : message,
        status,
        reason: getReasonPhrase(status),
        stack : (process.env.state === "production") ? err.stack : undefined
    })
}

export {notFound, errorHandler}