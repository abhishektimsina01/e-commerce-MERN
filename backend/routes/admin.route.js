import express from "express";
import { createAdmin, delAllUser, delOneUser, getAllUser } from "../controllers/admin.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeUser } from "../middleware/authorizedRoute.js";
const adminRouter = express.Router()
// , authorizeUser("superadmin")
adminRouter.get("/getAllUser",authenticateUser, authorizeUser("superadmin", "admin"), getAllUser)
adminRouter.get("/delAllUser",authenticateUser,delAllUser)
adminRouter.get("/delOneUser/:id",authenticateUser, authorizeUser("superadmin"), delOneUser)
adminRouter.post("/createAdmin",authenticateUser,authorizeUser("superadmin"), createAdmin)

export {adminRouter}