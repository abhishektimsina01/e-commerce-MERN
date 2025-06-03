import express from "express"
import { login, logout, refresh, resetPassword, resetPasswordToken, signup } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.get("/refresh",refresh)
authRouter.post("/login",login)
authRouter.get("/logout", logout)

export {authRouter}