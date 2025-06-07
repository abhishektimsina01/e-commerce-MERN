import express from "express";
import {
  login,
  logout,
  refresh,
  resetPassword,
  resetPasswordToken,
  signup,
} from "../controllers/auth.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeUser } from "../middleware/authorizedRoute.js";

const authRouter = express.Router();

authRouter.post("/auth/signup", signup);
authRouter.get("/auth/refresh", refresh);
authRouter.post("/auth/login", login);
authRouter.get(
  "/auth/logout",
  authenticateUser,
  authorizeUser("consumer", "provider", "admin", "superadmin"),
  logout
);

export { authRouter };
