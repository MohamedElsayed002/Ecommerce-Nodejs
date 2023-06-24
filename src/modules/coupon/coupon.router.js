

import express from 'express'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { createCoupon , getAllCoupon , getCoupon , updateCoupon , deleteCoupon} from './coupon.controller.js'


const couponRouter = express.Router()





couponRouter.route('/')
        .get(getAllCoupon)
        .post( protectedRoutes , allowedTo('admin' , 'user'), createCoupon)
couponRouter.route('/:id')
        .get(getCoupon)
        .patch(protectedRoutes,allowedTo('user'), updateCoupon)
        .delete(protectedRoutes,allowedTo('user' ,'admin'), deleteCoupon)


export default couponRouter