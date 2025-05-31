import mongoose, { mongo } from "mongoose";

const cartSchema = new mongoose.Schema({
    product : {type : mongoose.Schema.Types.ObjectId, ref : "products"},
    user : {type : mongoose.Schema.Types.ObjectId, ref : "users"},
    quantity  : {type : Number, required : true},
    total : Number
})

const cart = mongoose.model("cart", cartSchema)

export {cart}