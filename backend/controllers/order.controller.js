import { Orders } from "../models/orders.js"

const createOrder = (req,res,next) => {
    try{
            const {product, quantity, price, total, status} = req.body
            const orderBy = req.user
            const newOrder = new Orders({

            })
    }
    catch(err){
        next(err)
    }
}
const getAllOrders = (req,res,next) => {
    try{

    }
    catch(err){
        next(err)
    }
}
const cancelOrder = (req,res,next) => {
    try{

    }
    catch(err){
        next(err)
    }
}
const updateOrder = (req,res,next) => {
    try{

    }
    catch(err){
        next(err)
    }
}

export {createOrder,getAllOrders,cancelOrder,updateOrder}