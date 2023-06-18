

import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : [true , 'name is required'],
        trim  :true,
        required : true,
        minLength : [2, 'too short brand name']
    },
    slug : {
        required: true,
        lowercase : true,
        type:String,
    },
    logo : String
}, {timestamps : true})


export const brandModel = mongoose.model('brand' , brandSchema)