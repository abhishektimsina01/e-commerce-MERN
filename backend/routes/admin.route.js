import express from "express";
import { delAllUser, delOneUser } from "../controllers/admin.controller.js";

const adminRouter = express.Router()

adminRouter.get("/delAllUser", delAllUser)
adminRouter.get("/delOneUser/:id", delOneUser)

export {adminRouter}