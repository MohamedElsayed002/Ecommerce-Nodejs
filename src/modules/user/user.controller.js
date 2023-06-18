
import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { userModel } from "../../../database/models/user.model.js";



const catchAsync = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch((err) => {
            // res.json(err)
            next(err)
        })
    }
}

export const createUser = catchAsync(async (req,res,next) => {

    let user = await userModel.findOne({email : req.body.email})
    if(user) return next(new AppError("account already exists",409))

    let result = await userModel(req.body)
    await result.save()
    res.json({message : " success " , result })
})


export const getAllUsers = catchAsync(async (req,res) => {
    let result = await userModel.find({})
    res.json({message : "success" , result })
})

export const getUser = catchAsync(async (req,res,next) => {
    const {id} = req.params
    let result = await userModel.findById(id)
    if(!result) {
        return next(new AppError('user not  found' , 404))
    }
    res.json({message : "success" , result })
})

export const updateUser = catchAsync(async (req,res,next) =>{
    const {id} = req.params
    let result = await userModel.findByIdAndUpdate({_id : id} , req.body , {new : true})
    if(!result) {
        return next(new AppError('user  not  found' , 404))
    }
    res.json({message : "success" , result })
})




export const deleteUser = catchAsync(async (req,res,next) => {
    const {id} = req.params
    let result = await userModel.findByIdAndDelete(id)
    if(!result) {
        return next(new AppError('user not  found' , 404))
    }
        res.json({message : "success" , result})
})



export const changeUserPassword = catchAsync(async(req,res,next) => {
    let {id} = req.params
    // important 
    req.body.passwordChangedAt = Date.now()
    let result = await userModel.findByIdAndUpdate(id , req.body , {new : true})
    !result && next(new AppError('user not found' , 404))
    result && res.json({message : "success" , result })
})