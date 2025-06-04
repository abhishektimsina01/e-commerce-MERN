import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderedBy : {type : mongoose.Schema.Types.ObjectId, ref : "users"},
    product : {type : mongoose.Schema.Types.ObjectId, ref : "products"},
    quantity : {type : Number, min : 1},
    price : {type : Number, required : true},
    total : {type : Number, required : true},
})

const Orders = mongoose.model("orders", orderSchema)

export {Orders}