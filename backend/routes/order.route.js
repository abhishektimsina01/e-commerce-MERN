import express from "express";
import {createOrder, getAllOrders, cancelOrder, updateOrder} from "../controllers/order.controller.js"
import {authenticateUser} from "../middleware/authenticateUser.js"
import {authorizeUser} from "../middleware/authorizedRoute.js"
const orderRouter = express.Router()

orderRouter.use(authenticateUser)
orderRouter.post("/", authorizeUser("consumer"), createOrder)
orderRouter.get("/", getAllOrders)
orderRouter.delete("/:id", authorizeUser("consumer", "provider"), cancelOrder)
orderRouter.patch("/:id", authorizeUser("consumer","provider"), updateOrder)

export {orderRouter}