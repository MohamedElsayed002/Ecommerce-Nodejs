import { categoryModel } from "../../../database/models/category.model.js";
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

export const createCategory = catchAsync(async (req,res) => {
    req.body.image = req.file.filename
    req.body.slug = slugify(req.body.name)

    let result = await categoryModel(req.body)
    await result.save()
    res.json({message : " success " , result })
})


export const getAllCategories = catchAsync(async (req,res) => {

    
    let apiFeatures = new AppFeature(categoryModel.find() , req.query).paginate()
    let result = await apiFeatures.mongooseQuery
    // let result = await categoryModel.find({})
    res.json({message : "success" , page : apiFeatures.page, result })
})

export const getCategory = catchAsync(async (req,res,next) => {
    const {id} = req.params
    let result = await categoryModel.findById(id)
    if(!result) {
        return next(new AppError('category not  found' , 404))
    }
    res.json({message : "success" , result })
})

export const updateCategory = catchAsync(async (req,res,next) =>{
    const {id} = req.params
    const {name} = req.body
    let result = await categoryModel.findByIdAndUpdate({_id : id} , {name , slug: slugify(name)} , {new : true})
    if(!result) {
        return next(new AppError('category not  found' , 404))
    }
    res.json({message : "success" , result })
})




export const deleteCategory = catchAsync(async (req,res,next) => {
    const {id} = req.params
    let result = await categoryModel.findByIdAndDelete(id)
    if(!result) {
        return next(new AppError('category not  found' , 404))
    }
        res.json({message : "success" , result})
})