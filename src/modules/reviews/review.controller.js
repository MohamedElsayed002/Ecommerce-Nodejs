import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { reviewModel } from "../../../database/models/review.model.js";
import { AppFeature } from "../../utils/AppFeatures.js";


const catchAsync = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch((err) => {
            // res.json(err)
            next(err)
        })
    }
}

export const createReview = catchAsync(async (req,res,next) => {
    // req.body.slug = slugify(req.body.name)
    // req.body.logo = req.file.filename
    req.body.user = req.user._id
    let isReview = await reviewModel.findOne({user : req.user._id , product : req.body.product})
    if(isReview) return next(new AppError('you created a review before' , 409))
    let result = await reviewModel(req.body)
    await result.save()
    res.json({message : " success " , result })
})


export const getAllReviews = catchAsync(async (req,res) => {
    
    // let apiFeatures = new AppFeature(reviewModel.find() , req.query)
    // .paginate().fields().filter().search().sort()

    // let result = await apiFeatures.mongooseQuery()
    let result = await  reviewModel.find()
    res.json({message : "success" , result })
})

export const getReview = catchAsync(async (req,res,next) => {
    const {id} = req.params
    let result = await reviewModel.findById(id)
    if(!result) {
        return next(new AppError('review not  found' , 404))
    }
    res.json({message : "success" , result })
})

export const updateReview = catchAsync(async (req,res,next) =>{
    const {id} = req.params
    let result = await reviewModel.findByIdAndUpdate({_id : id , user : req.user._id} , req.body , {new : true})
    if(!result) {
        return next(new AppError('review not found or you are not authorized to perform this action' , 404))
    }
    res.json({message : "success" , result })
})




export const deleteReview = catchAsync(async (req,res,next) => {
    const {id} = req.params
    let result = await reviewModel.findByIdAndDelete(id)
    if(!result) {
        return next(new AppError('review  not  found' , 404))
    }
        res.json({message : "success" , result})
})