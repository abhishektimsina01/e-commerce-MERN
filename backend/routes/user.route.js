import express from 'express'

const userRouter = express.Router()

userRouter.get("/profile", getUser)

export {userRouter}