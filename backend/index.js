import express from "express"
import dotenv from "dotenv"
import { errorHandler, notFound } from "./middleware/error.handler.middleware.js"
import { authRouter} from "./routes/auth.route.js"
import { adminRouter } from "./routes/admin.route.js"
import { connectDB } from "./db.config.js"
import {serverMiddleware} from "./middleware/server.middleware.js"
import { Users } from "./models/user.js"
dotenv.config()

//express application
const app = express()

//connection of database
connectDB(process.env.db_url)
serverMiddleware(app)

//routers
app.use("/auth", authRouter)
app.use("/admin", adminRouter)
// app.use("/user", userRouter)
// app.use("/cart", cartRouter)
// app.use("/order", orderRouter)
// app.use("/product", productRouter)
// app.use("/payment", paymentRouter)
// app.use("/review", reviewRouter)


//undefined route/method and error handler
app.use(notFound)
app.use(errorHandler)
app.listen(process.env.port, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("the server has been started correctly",process.env.port)
    }
})