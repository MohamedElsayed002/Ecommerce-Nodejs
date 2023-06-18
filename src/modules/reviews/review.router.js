

import express from 'express'
import {createReview , getAllReviews , getReview , updateReview , deleteReview} from './review.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'


const reviewRouter = express.Router()





reviewRouter.route('/')
        .get(getAllReviews)
        .post( protectedRoutes , allowedTo('admin' , 'user'),createReview)
reviewRouter.route('/:id')
        .get(getReview)
        .patch(protectedRoutes,allowedTo('user'),updateReview)
        .delete(protectedRoutes,allowedTo('user' ,'admin'),deleteReview)


export default reviewRouter