import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { brandModel } from "../../../database/models/brand.model.js";



const catchAsync = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch((err) => {
            // res.json(err)
            next(err)
        })
    }
}

export const createBrand = catchAsync(async (req,res) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let result = await brandModel(req.body)
    await result.save()
    res.json({message : " success " , result })
})


export const getAllBrands = catchAsync(async (req,res) => {
    let result = await brandModel.find({})
    res.json({message : "success" , result })
})

export const getBrand = catchAsync(async (req,res,next) => {
    const {id} = req.params
    let result = await brandModel.findById(id)
    if(!result) {
        return next(new AppError('category not  found' , 404))
    }
    res.json({message : "success" , result })
})

export const updateBrand = catchAsync(async (req,res,next) =>{
    const {id} = req.params
    const {name} = req.body
    let result = await brandModel.findByIdAndUpdate({_id : id} , {name , slug: slugify(name)} , {new : true})
    if(!result) {
        return next(new AppError('category not  found' , 404))
    }
    res.json({message : "success" , result })
})




export const deleteBrand = catchAsync(async (req,res,next) => {
    const {id} = req.params
    let result = await brandModel.findByIdAndDelete(id)
    if(!result) {
        return next(new AppError('category not  found' , 404))
    }
        res.json({message : "success" , result})
})