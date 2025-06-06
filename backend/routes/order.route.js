import express from "express";

const orderRouter = express.Router()

orderRouter.post("/", createOrder)



export {orderRouter}