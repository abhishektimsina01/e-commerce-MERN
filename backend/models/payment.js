import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : "users"},
    seller : {type : mongoose.Schema.Types.ObjectId, ref : "users"},
    oder : {type : mongoose.Schema.Types.ObjectId, ref : "orders"}
})

const payment = mongoose.model("payments", paymentSchema)

export {payment}