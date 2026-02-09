import mongoose from "mongoose"

const connectDB = async(url) =>{
    while(true){
    try{
        await mongoose.connect(url)
        console.log("databse connected succesfully")
        break
    }
    catch(err){
        console.log("error in connection to database", err)
    }
}
}

export {connectDB}