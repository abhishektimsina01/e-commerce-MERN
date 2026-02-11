import mongoose from "mongoose"
import { Orders } from "../models/orders.js"
import { orderSchema } from "../validation/validation.js"
import { Products } from "../models/product.js"
import { outOfTheStock } from "../mails/OutOfStock.js"

const createOrder = async(req,res,next) => {
    try{
            const {product, quantity} = req.body
            const orderedBy = req.user._id
            const productInfo = await Products.findById(product)
            console.log("before", productInfo)

            if(productInfo.stock == 0){
                const err = new Error("Out of the stock sorry")
                // outOfTheStock(productInfo.name)
                err.status = 404
                throw err
            }

            else if(productInfo.stock - quantity < 0){
                const err = new Error(`not enough stock, only ${productInfo.stock} left`)
                throw err
            }

            const price = productInfo.price
            const total = price * quantity
            const status = req.body?.status ?? "pending"
            const {error} = orderSchema.validate(req.body)
            if (error){
                throw error
            }
            const newOrder = await Orders.create({
                product, quantity, status, orderedBy, price, total
            })
            productInfo.stock = productInfo.stock - 1
            console.log("after", productInfo)
            productInfo.save()
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
            console.log(customerId)
            const orders = await Orders.find({orderedBy :  customerId}).select("price quantity product total status").populate({path : "product", select : "name brand productOwner"})
            res.json(orders)
        }
        // provider le payeko sabai orders haru
        // orders jun chai usle haleko product ma aayeko xa
        else if(req.user.role == "provider"){
            const providerId = req.user._id
            const productId = await Products.find({productOwner : providerId}).select("_id")
            res.json(productId)
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