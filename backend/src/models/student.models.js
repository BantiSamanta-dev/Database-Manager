
import mongoose, { Schema } from "mongoose";



const scoreSchema  = new mongoose.Schema({
    score:Number,
    type:String
})

const studentSchema = new mongoose.Schema({
    name:String,
    score : [scoreSchema]
})

const Student = mongoose.model('Student', studentSchema)


export default Student