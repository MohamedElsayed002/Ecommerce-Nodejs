
import { userModel } from "../../../database/models/user.model.js"
import bcrypt from 'bcrypt'
import AppError from "../../utils/AppError.js"
import jwt from 'jsonwebtoken'



const catchAsync = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch((err) => {
            // res.json(err)
            next(err)
        })
    }
}


export const signup = catchAsync(async (req,res,next) => {

    let user = await userModel.findOne({email : req.body.email})
    if(user) return next(new AppError('email is already exists' , 409))
    let User = new userModel(req.body)
    await User.save()
    res.json({message : "success" , User})
})


export const signIn = catchAsync(async (req,res,next) => {

    const {email,password} = req.body
    let isFound = await userModel.findOne({email})
    const match = bcrypt.compare(password,isFound.password)
    if(isFound && match) {
        let token = jwt.sign({name : isFound.name, userId : isFound._id , role : isFound.role} , 'mohamed')
        return res.json({message : "success" , token})
    }

    next(new AppError("incorrect email or password", 401))

})


export const protectedRoutes = catchAsync(async (req,res,next) => {

    let {token} = req.headers
    if(!token) return next(new AppError("token is required" , 401))

    let decoded = await jwt.verify(token , 'mohamed')

    let user = await userModel.findById(decoded.userId)
    if(!user) return next(new AppError("user is not found" , 401))


    // to make sure token not expired
    // console.log(changePasswordDate + "===" + decoded.iat)

    if(user.passwordChangedAt) {
        let changePasswordDate = parseInt(user.passwordChangedAt.getTime()/1000)
        if(changePasswordDate > decoded.iat) return next(new AppError("invalid token" , 401))
    }
    
    req.user = user
    next()
    // res.json({message : `hi ${decoded.name}`})
})



export const allowedTo = (...roles) => {

    console.log(roles)
    return catchAsync(async (req,res,next) => {
        if(!roles.includes(req.user.role))
            return next(new AppError('you are not authorized to access this route' + req.user.role , 401))
        next()
    })
}