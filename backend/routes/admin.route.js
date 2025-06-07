import express from "express";
import {
  createAdmin,
  delAllUser,
  delOneUser,
  getAllUser,
  getOneUser,
} from "../controllers/admin.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeUser } from "../middleware/authorizedRoute.js";
const adminRouter = express.Router();
adminRouter.get(
  "/admin/getAllUser",
  authenticateUser,
  authorizeUser("superadmin", "admin"),
  getAllUser
);
adminRouter.get(
  "/admin/getOneUser/:id",
  authenticateUser,
  authorizeUser("superadmin", "admin"),
  getOneUser
);
adminRouter.get(
  "/admin/delAllUser",
  authenticateUser,
  authorizeUser("superadmin"),
  delAllUser
);
adminRouter.delete(
  "/admin/delOneUser/:id",
  authenticateUser,
  authorizeUser("superadmin"),
  delOneUser
);
adminRouter.post(
  "/admin/createAdmin",
  authenticateUser,
  authorizeUser("superadmin"),
  createAdmin
);
export { adminRouter };
