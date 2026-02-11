import mongoose from "mongoose"
import { Orders } from "../models/orders.js"
import { orderSchema } from "../validation/validation.js"
import { Products } from "../models/product.js"

const createOrder = async(req,res,next) => {
    try{
            const {product, quantity} = req.body
            const orderBy = req.user._id
            const productInfo = await Products.findById(product)
            console.log(productInfo)
            const status = req.body?.status ?? "pending"
            console.log({product, orderBy, quantity, status})
            const {error} = orderSchema.validate(req.body)
            if (error){
                throw error
            }
            const newOrder = new Orders({
                product, quantity,status, orderBy
            })
            newOrder.save()
            res.json(newOrder)
    }
    catch(err){
        next(err)
    }
}

const getAllOrders = async(req,res,next) => {
    try{
        // consumer le gareko sabai orders haru
        if(req.user.role == "consumer"){
            const customerId = req.user._id
            const orders = await Orders.find({orderedBy : mongoose.Types.ObjectId(customerId)}).select("price", "quantity", "product", "total", "status").populate({path : "product", select : "name brand productOwner"})
            res.json(orders)
        }

        // provider le payeko sabai orders haru
        else if(req.user.role == "provider"){
            const providerId = req.user._id
        }
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