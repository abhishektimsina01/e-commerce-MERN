import express from "express";
import {createOrder, getAllOrders, cancelOrder, updateOrder} from "../controllers/"
const orderRouter = express.Router()

orderRouter.post("/", createOrder)
orderRouter.get("/", getAllOrders)
orderRouter.delete("/:id", cancelOrder)
orderRouter.update("/:id", updateOrder)


export {orderRouter}