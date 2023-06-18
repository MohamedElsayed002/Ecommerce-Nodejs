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



export const addToAddress = catchAsync(async (req,res,next) =>{
    let result = await userModel.findByIdAndUpdate( req.user._id , {$addToSet : {addresses : req.body}} , {new : true})
    if(!result) {
        return next(new AppError('review not found or you are not authorized to perform this action' , 404))
    }
    res.json({message : "success" , result : result.addresses })
})


export const removeFromAddress = catchAsync(async (req,res,next) =>{
    let result = await userModel.findByIdAndUpdate( req.user._id , {$pull : {addresses : {_id : req.body.address}} } , {new : true})
    if(!result) {
        return next(new AppError('review not found or you are not authorized to perform this action' , 404))
    }
    res.json({message : "success" , result : result.addresses })
})



export const getAllUserAddress = catchAsync(async (req,res,next) =>{
    let result = await userModel.findOne({_id : req.user._id})
    if(!result) {
        return next(new AppError('review not found or you are not authorized to perform this action' , 404))
    }
    res.json({message : "success" , result : result.addresses })
})




