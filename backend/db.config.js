import mongoose from "mongoose"

const connectDB = async(url) =>{
    try{
        await mongoose.connect(url)
        console.log("databse connected succesfully")
    }
    catch(err){
        console.log("error in connection to database", err)
    }
}

export {connectDB}