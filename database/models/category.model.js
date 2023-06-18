

import mongoose from 'mongoose'



const CategorySchema = new mongoose.Schema({
    name : {
        type : String,
        unique : [true , 'name is required'],
        trim : true,
        required : true,
        minLength : [2,'too short category name']
    },
    slug : {
        type : String,
        lowercase : true,
        required: true
    },
    image : String
}, {timestamps : true})


CategorySchema.post('init' , (doc) => {
    console.log(doc)
    doc.image = "http://localhost:3000/category/" + doc.image
})

export const categoryModel = mongoose.model('category' , CategorySchema)