import mongoose, { mongo } from "mongoose"

const reviewSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : "users"},
    product : {type : mongoose.Schema.Types.ObjectId, ref : "products"},
    conetnt : {type : String},
    star : {type : Number,min : 0,max : 5 ,required : true}
})

const Reviews = mongoose.model("reviews", reviewSchema)
export {Reviews}