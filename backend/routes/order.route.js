import express from "express";
import {createOrder, getAllOrders, cancelOrder, updateOrder} from "../controllers/"
const orderRouter = express.Router()

orderRouter.post("/order", createOrder)
orderRouter.get("/order", getAllOrders)
orderRouter.delete("/order/:id", cancelOrder)
orderRouter.update("/order/:id", updateOrder)


export {orderRouter}