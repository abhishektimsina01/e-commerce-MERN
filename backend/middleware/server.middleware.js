import express from "express"
import rateLimit from "express-rate-limit"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
const limiter = rateLimit({
    windowMs :  5 * 60 * 1000,
    max : 50,
    message : {
        status : 429,
        message : "Too many request, please try again later"
    }
})
const serverMiddleware = (app) => {
    const allowedOrigins = ["http://localhost:3000", "http://domain.com"]
    app.use(limiter)
    app.use(cors())
    app.use(morgan("dev"))
    app.use(express.json())
    app.use(express.urlencoded({extended : true}))
    app.use(cookieParser())
    console.log("middleware started")
}

export {serverMiddleware}