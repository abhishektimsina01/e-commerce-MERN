import express from "express";
import { createAdmin, delAllUser, delOneUser, getAllUser, getOneUser } from "../controllers/admin.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeUser } from "../middleware/authorizedRoute.js";
const adminRouter = express.Router()
adminRouter.get("/getAllUser",authenticateUser, authorizeUser("superadmin", "admin"), getAllUser)
adminRouter.get("/getOneUser/:id",authenticateUser, authorizeUser("superadmin", "admin"), getOneUser)
adminRouter.get("/delAllUser",authenticateUser, authorizeUser("superadmin"), delAllUser)
adminRouter.delete("/delOneUser/:id",authenticateUser, authorizeUser("superadmin"), delOneUser)
adminRouter.post("/createAdmin",authenticateUser, authorizeUser("superadmin"), createAdmin)
export {adminRouter}