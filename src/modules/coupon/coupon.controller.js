import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { AppFeature } from "../../utils/AppFeatures.js";
import {couponModel} from '../../../database/models/coupun.model.js'
import qrcode from 'qrcode'


const catchAsync = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch((err) => {
            // res.json(err)
            next(err)
        })
    }
}

export const createCoupon = catchAsync(async (req,res,next) => {
    let result = await couponModel(req.body)
    await result.save()
    res.json({message : " success " , result })
})


export const getAllCoupon = catchAsync(async (req,res) => {
    
    // let apiFeatures = new AppFeature(reviewModel.find() , req.query)
    // .paginate().fields().filter().search().sort()

    // let result = await apiFeatures.mongooseQuery()
    let result = await  couponModel.find()
    res.json({message : "success" , result })
})

export const getCoupon = catchAsync(async (req,res,next) => {
    const {id} = req.params
    let result = await couponModel.findById(id)
    let url = await  qrcode.toDataURL(result.code)
    if(!result) {
        return next(new AppError('review not  found' , 404))
    }
    res.json({message : "success" , result , url })
})

export const updateCoupon = catchAsync(async (req,res,next) =>{
    const {id} = req.params
    let result = await couponModel.findByIdAndUpdate(id , req.body , {new : true})
    if(!result) {
        return next(new AppError('review not found or you are not authorized to perform this action' , 404))
    }
    res.json({message : "success" , result })
})




export const deleteCoupon = catchAsync(async (req,res,next) => {
    const {id} = req.params
    let result = await couponModel.findByIdAndDelete(id)
    if(!result) {
        return next(new AppError('review  not  found' , 404))
    }
        res.json({message : "success" , result})
})