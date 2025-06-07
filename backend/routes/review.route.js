import express from "express";
const reviewRouter = express.Router();
import {
  makeReview,
  getAllreview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { authorizeUser } from "../middleware/authorizedRoute.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

reviewRouter.post(
  "/review/:id",
  authenticateUser,
  authorizeUser("consumer"),
  makeReview
);
reviewRouter.patch(
  "/review/:id",
  authenticateUser,
  authorizeUser("consumer", "superadmin"),
  updateReview
);
reviewRouter.get(
  "/review",
  authenticateUser,
  authorizeUser("consumer", "admin", "superadmin"),
  getAllreview
);
reviewRouter.delete(
  "/review/:id",
  authenticateUser,
  authorizeUser("consumer", "provider", "superadmin"),
  deleteReview
);

export { reviewRouter };
