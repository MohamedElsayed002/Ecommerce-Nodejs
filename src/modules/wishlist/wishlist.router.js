

import express from 'express'
import {addToWishList , removeFromWishlist , getAllUserWishList} from './wishlist.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'


const wishListRouter = express.Router()



wishListRouter.patch('/' , protectedRoutes , allowedTo('user') ,addToWishList)
wishListRouter.delete('/' , protectedRoutes , allowedTo('user') ,removeFromWishlist)
wishListRouter.get('/' , protectedRoutes , allowedTo('user') ,getAllUserWishList)



export default wishListRouter