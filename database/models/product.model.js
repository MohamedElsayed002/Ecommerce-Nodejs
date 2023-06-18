

import mongoose from 'mongoose'



const productSchema = new mongoose.Schema({
    title : {
        type : String,
        unique : [true , 'product title is unique'],
        trim : true,
        required : [true , 'product title is required'],
        minLength : [2 , 'too short product name']
    },
    slug : {
        type : String,
        lowercase : true,
        required : true
    },
    price : {
        type : Number,
        required : [true , 'product price is required'],
        min : 0
    },
    priceAfterDiscount : {
        type : Number,
        default : 0,
        min : 0,
    },
    ratingAverage : {
        type : Number,
        min : [1,'rating average must be greater than 1'],
        max : [5,'rating average must be less than 5'],
    },
    ratingCount : {
        type : Number,
        default : 0,
        min : 0
    },
    description : {
        type : String,
        minLength : [5, 'too short product description'],
        maxLength : [300 , 'too long product description'],
        required : [true , 'product description required'],
        trim : true
    },
    quantity  :{
        type : Number,
        default : 0,
        min : 0,
        required : [true , 'product quantity required']
    },
    sold :{
        type : Number,
        default : 0,
        min : 0
    },
    imgCover : String,
    images : [String],
    category : {
        type : mongoose.Types.ObjectId,
        ref :'category',
        required : [true , 'product category required']
    },
    subCategory : {
        type : mongoose.Types.ObjectId,
        ref : 'subCategory',
        required : [true , 'product subCategory required']
    },
    brand : {
        type : mongoose.Types.ObjectId,
        ref : 'brand',
        required : [true , 'product brand required']
    }
}, {timestamps : true , toJSON : {virtuals: true} , toObject : {virtuals : true}})


productSchema.post('init' , (doc) => {
    doc.imgCover = "http://localhost:3000/product/" + doc.imgCover
    doc.images = doc.images.map(image => "http://localhost:3000/product/" + image)
})

productSchema.virtual('myReviews' , {
    ref : 'review',
    localField: '_id',
    foreignField : 'product'
})

productSchema.pre('find', function () {
    this.populate('myReviews')
})

export const productModel = mongoose.model('product' ,productSchema )