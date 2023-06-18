import { subCategoryModel } from "../../../database/models/subcategory.model.js";
import slugify from "slugify";
import AppError from "../../utils/AppError.js";


const catchAsync = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch((err) => {
            // res.json(err)
            next(err)
        })
    }
}

export const createSubCategory = catchAsync(async (req,res) => {
    const {name,category} = req.body
    let result = await subCategoryModel({name ,category, slug : slugify(name)})
    await result.save()
    res.json({message : " success " , result })
})


export const getAllSubCategories = catchAsync(async (req,res) => {
    let filter = {}
    if(req.params.categordId) {
        filter = {category : req.params.categordId}
    }
    let result = await subCategoryModel.find(filter)
    res.json({message : "success" , result })
})

export const getSubCategory = catchAsync(async (req,res,next) => {
    const {id} = req.params
    let result = await subCategoryModel.findById(id)
    if(!result) {
        return next(new AppError('category not  found' , 404))
    }
    res.json({message : "success" , result })
})

export const updateSubCategory = catchAsync(async (req,res,next) =>{
    const {id} = req.params
    const {name,category} = req.body
    let result = await subCategoryModel.findByIdAndUpdate({_id : id} , {name ,category, slug: slugify(name)} , {new : true})
    if(!result) {
        return next(new AppError('category not  found' , 404))
    }
    res.json({message : "success" , result })
})




export const deleteSubCategory = catchAsync(async (req,res,next) => {
    const {id} = req.params
    let result = await subCategoryModel.findByIdAndDelete(id)
    if(!result) {
        return next(new AppError('category not  found' , 404))
    }
        res.json({message : "success" , result})
})