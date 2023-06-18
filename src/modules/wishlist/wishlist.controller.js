import { userModel } from "../../../database/models/user.model.js";
import AppError from "../../utils/AppError.js";

const catchAsync = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch((err) => {
            // res.json(err)
            next(err)
        })
    }
}



export const addToWishList = catchAsync(async (req,res,next) =>{
    const {product} = req.body
    let result = await userModel.findByIdAndUpdate( req.user._id , {$addToSet : {wishlist : product}} , {new : true})
    if(!result) {
        return next(new AppError('review not found or you are not authorized to perform this action' , 404))
    }
    res.json({message : "success" , result : result.wishlist })
})


export const removeFromWishlist = catchAsync(async (req,res,next) =>{
    const {product} = req.body
    let result = await userModel.findByIdAndUpdate( req.user._id , {$pull : {wishlist : product}} , {new : true})
    if(!result) {
        return next(new AppError('review not found or you are not authorized to perform this action' , 404))
    }
    res.json({message : "success" , result : result.wishlist })
})



export const getAllUserWishList = catchAsync(async (req,res,next) =>{
    let result = await userModel.findOne({_id : req.user._id}).populate('wishlist')
    if(!result) {
        return next(new AppError('review not found or you are not authorized to perform this action' , 404))
    }
    res.json({message : "success" , result : result.wishlist })
})




