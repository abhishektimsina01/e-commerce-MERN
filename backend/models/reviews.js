import mongoose, { mongo } from "mongoose"

const reviewSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : "users"},
    product : {tyep : mongoose.Schema.Types.ObjectId, ref : "products"},
    conetnt : {type : String},
    star : {type : Number, required : true}
})

const reviews = mongoose.model("reviews", reviewSchema)
export {reviews}