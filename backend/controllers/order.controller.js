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
            const products = await Products.find({productOwner : providerId}).select("_id")
            const productIds = products.map((product)=> product._id)
            console.log(productIds)
            //now malai tyotyo orders chaiyo jasko product is in productIds
            const orders = await Orders.find({product : {$in : productIds}}).select("orderedBy price quantity product total status").populate({path : "product", select : "name brand"})
            res.json(orders)
        }
    }
    catch(err){
        next(err)
    }
}

const cancelOrder = async(req,res,next) => {
    try{
        const cancellorId = req.user._id
        const toBeCancelledOrder = req.params.id
        const order = await Orders.findById(toBeCancelledOrder)
        order.status = "cancelled"
        await order.save()
        res.json(order)
    }
    catch(err){
        next(err)
    }
}
const updateOrder = async(req,res,next) => {
    try{
        const customerId = req.user._id
        const data = req.body
        if(data.status == "cancelled"){
            delete data.status
        }
        const orderId = req.params.id
        const order = await Orders.findById(orderId)
        Object.assign(order, data)
        order.save()
        res.json(order)
    }
    catch(err){
        next(err)
    }
}
export {createOrder,getAllOrders,cancelOrder,updateOrder}