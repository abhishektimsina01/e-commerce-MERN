import express from "express";

const reviewRouter = express.Router()
import {makeReview,} from "../controllers/"
import { authorizeUser } from "../middleware/authorizedRoute";
import { authenticateUser } from "../middleware/authenticateUser";

reviewRouter.post("/",authenticateUser,authorizeUser("consumer"),makeReview)
reviewRouter.patch("/:id",authenticateUser,authorizeUser("consumer", "superadmin"), updateReview)
reviewRouter.delete("/:id",authenticateUser, authorizeUser("consumer", "provider", "superadmin"), deleteReview)

export {reviewRouter}