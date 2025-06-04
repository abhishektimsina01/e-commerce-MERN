import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
    name : {type : String, required : true},
    description : {type : String},
    stock : {type : Number, required : true},
    price : {type : Number, required : true},
    brand : {type : String, required : true},
    state : {
        type : String,
        enum : {values : ["new", "2nd hand"], 
                message : "The state is not vaid"
            }
    },
    category : {type : String,
        enum : {
            values : ["electronics", "clothing", "accessiories", "toys and games", "furnitures", "utensils", "equiment", "beauty products", "Pet and pet care"],
            message  : "is not a valid category"
        }
    },
    productOwner : {type : mongoose.Schema.Types.ObjectId, ref : "user"},
    image : {type : String}
}, {timestamps : true , versionKey : false})

const Products = mongoose.model("products", productSchema)
export {Products}