import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderedBy : {type : mongoose.Schema.Types.ObjectId, ref : "users"},
    product : {type : mongoose.Schema.Types.ObjectId, ref : "products"},
    quantity : {type : Number, min : 1},
    price : {type : Number, required : true},
    total : {type : Number, required : true},
    status : {type : String, enum : {values : ["pending","processing", "completed", "canceled"], message : "the order must be either penfing or completed"}}
})

const Orders = mongoose.model("orders", orderSchema)

export {Orders}