import mongoose, { mongo } from "mongoose";

const historySchema = mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : "users"},
    order : [{type : mongoose.Schema.Types.ObjectId, ref : "orders"}]
})

const history = mongoose.model("history", historySchema)

export {history}