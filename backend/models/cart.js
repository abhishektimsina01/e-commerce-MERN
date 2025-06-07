import mongoose, { mongo } from "mongoose";

const cartSchema = new mongoose.Schema({
    product : {type : mongoose.Schema.Types.ObjectId, ref : "products"},
    user : {type : mongoose.Schema.Types.ObjectId, ref : "users"},
})

const cart = mongoose.model("cart", cartSchema)

export {cart}