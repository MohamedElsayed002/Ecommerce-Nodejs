
import express from 'express'
import {createProduct ,
        getAllProducts,
        getProduct,
        updateProduct,
        deleteProduct } from './products.controller.js'
import { uploadMultiFiles } from '../../middleware/fileupload.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'


const productsRouter = express.Router()

let fieldsArray = [{name : 'imgCover' , maxCount : 1} , {name : 'images' , maxCount : 10}]

productsRouter
        .route('/')
        .get(getAllProducts)
        .post(protectedRoutes,allowedTo('admin','user' ),uploadMultiFiles(fieldsArray,'product'), createProduct)
productsRouter
        .route('/:id')
        .get(getProduct)
        .patch(updateProduct)
        .delete(deleteProduct)


export default productsRouter