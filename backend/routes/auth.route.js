import express from "express"
import { login, logout, refresh, resetPassword, resetPasswordToken, signup } from "../controllers/auth.controller.js"
import { authenticateUser } from "../middleware/authenticateUser.js"
import { authorizeUser } from "../middleware/authorizedRoute.js"

const authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.get("/refresh",refresh)
authRouter.post("/login",login)
authRouter.get("/logout",authenticateUser, authorizeUser("consumer", "provider", "admin", "superadmin"), logout)

export {authRouter}