import express from "express"
import dotenv from "dotenv"
import { errorHandler, notFound } from "./middleware/error.handler.middleware.js"
import { authRouter} from "./routes/auth.route.js"
import { adminRouter } from "./routes/admin.route.js"
import { productRouter } from "./routes/product.route.js"
import {userRouter} from "./routes/user.route.js"
import { reviewRouter } from "./routes/review.route.js"
import { connectDB } from "./db.config.js"
import {serverMiddleware} from "./middleware/server.middleware.js"
import { fileURLToPath } from "url"
import path from "path"
import { downloadRouter } from "./routes/download.route.js"
import { Users } from "./models/user.js"
import mongoose from "mongoose"
import { orderRouter } from "./routes/order.route.js"
dotenv.config()

//express application
const app = express()


const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

serverMiddleware(app, __dirname)

//routers
app.delete("/deleteUsers", async(req, res, next)=>{
    try{
    await Users.deleteMany({_id : {$exists : true}})
    const users = await Users.find({})
    res.json({
        message : users
    })
    }
    catch(err){
        next(err)
    }
})
app.use("/api/v1/auth/", authRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/review", reviewRouter)
app.use("/api/v1/download",downloadRouter)

//undefined route/method and error handler
app.use(notFound)
app.use(errorHandler)

async function startServer(){
    await connectDB(process.env.db_url)
    app.listen(process.env.port, (err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("the server has been started correctly",process.env.port)
        }
    })
}

startServer()