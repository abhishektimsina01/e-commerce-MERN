import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderedBy : {type : mongoose.Schema.Types.ObjectId, ref : "users"},
    product : {type : mongoose.Schema.Types.ObjectId, ref : "products"},
    quantity : {type : Number, min : 1, max : 20},
    
})

const Orders = mongoose.model("orders", orderSchema)

export {Orders}