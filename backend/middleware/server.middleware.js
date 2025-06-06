import express from "express"
import rateLimit from "express-rate-limit"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import path from "path"
const limiter = rateLimit({
    windowMs :  5 * 60 * 1000,
    max : 50,
    message : {
        status : 429,
        message : "Too many request, please try again later"
    }
})
const serverMiddleware = (app, __dirname) => {
    const allowedOrigins = ["http://localhost:3000", "http://domain.com"]
    app.use(limiter)
    console.log(__dirname)
    app.use(express.static(path.join( __dirname, "public")))
    app.use(cors())
    app.use(morgan("dev"))  
    app.use(express.json())
    app.use(express.urlencoded({extended : true}))
    app.use(cookieParser())
    console.log("middleware started")
}

export {serverMiddleware}