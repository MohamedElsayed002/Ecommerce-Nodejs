

import express from 'express'
import {addToAddress , removeFromAddress , getAllUserAddress} from './addresses.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'


const addressRouter = express.Router()



addressRouter.patch('/' , protectedRoutes , allowedTo('user') ,addToAddress)
addressRouter.delete('/' , protectedRoutes , allowedTo('user') ,removeFromAddress)
addressRouter.get('/' , protectedRoutes , allowedTo('user') ,getAllUserAddress)



export default addressRouter