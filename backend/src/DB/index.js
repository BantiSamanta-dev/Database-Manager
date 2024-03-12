import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
   await mongoose.connect(`mongodb://localhost:27017/sample3`)
   console.log(`database is connected `)
    }catch(err){
        console.log("there is some error that in DATABASE CONNECTION" , err)
    }
}

export default connectDB