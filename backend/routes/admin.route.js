import express from "express";
import { createAdmin, delAllUser, delOneUser, getAllUser, getOneUser } from "../controllers/admin.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeUser } from "../middleware/authorizedRoute.js";
const adminRouter = express.Router()

adminRouter.use(authenticateUser)
adminRouter.get("/getAllUser", authorizeUser("superadmin", "admin"), getAllUser)
adminRouter.get("/getOneUser/:id", authorizeUser("superadmin", "admin"), getOneUser)
adminRouter.get("/delAllUser", authorizeUser("superadmin"), delAllUser)
adminRouter.delete("/delOneUser/:id", authorizeUser("superadmin"), delOneUser)
adminRouter.post("/createAdmin", authorizeUser("superadmin"), createAdmin)
export {adminRouter}