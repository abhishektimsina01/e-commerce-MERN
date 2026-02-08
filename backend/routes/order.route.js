import express from "express";
import {createOrder, getAllOrders, cancelOrder, updateOrder} from "../controllers/"
import {authenticateUser} from "../middleware/authenticateUser"
import {authorizeUser} from "../middleware/authorizedRoute"
const orderRouter = express.Router()

orderRouter.use(authenticateUser)
orderRouter.post("/", authorizeUser("consumer"), createOrder)
orderRouter.get("/", getAllOrders)
orderRouter.delete("/:id", cancelOrder)
orderRouter.update("/:id", updateOrder)


export {orderRouter}