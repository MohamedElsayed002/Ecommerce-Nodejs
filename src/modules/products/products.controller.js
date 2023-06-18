import { productModel } from "../../../database/models/product.model.js";
import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { AppFeature } from "../../utils/AppFeatures.js";

const catchAsync = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch((err) => {
            // res.json(err)
            next(err)
        })
    }
}

export const createProduct = catchAsync(async (req,res) => {
    req.body.slug = slugify(req.body.title)
    req.body.imgCover = req.files.imgCover[0].filename
    req.body.images = req.files.images.map(obj => obj.filename)
    console.log(req.body)
    let result = await productModel(req.body)
    await result.save()
    res.json({message : " success " , result })
})


export const getAllProducts = catchAsync(async (req,res,next) => {

    let apiFeatures = new AppFeature(productModel.find() , req.query).paginate().filter().search().sort()
    let result = await apiFeatures.mongooseQuery
    // let result = await productModel.find()
    res.status(200).json({message : "success" , page :  apiFeatures.page , result})

})

export const getProduct = catchAsync(async (req,res,next) => {
    const {id} = req.params
    let result = await productModel.findById(id)
    if(!result) {
        return next(new AppError('category not  found' , 404))
    }
    res.json({message : "success" , result })
})

export const updateProduct = catchAsync(async (req,res,next) =>{
    const {id} = req.params
    if(req.body.title)     req.body.slug = slugify(req.body.title)
    let result = await productModel.findByIdAndUpdate({_id : id} , req.body , {new : true})
    if(!result) {
        return next(new AppError('category not  found' , 404))
    }
    res.json({message : "success" , result })
})




export const deleteProduct = catchAsync(async (req,res,next) => {
    const {id} = req.params
    let result = await productModel.findByIdAndDelete(id)
    if(!result) {
        return next(new AppError('category not  found' , 404))
    }
        res.json({message : "success" , result})
})