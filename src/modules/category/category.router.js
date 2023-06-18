


import express from 'express'
import {createCategory,
        getAllCategories, 
        getCategory , 
        updateCategory , 
        deleteCategory} from './category.controller.js'
import subCategoryRouter from '../subcategory/subcategory.router.js'
import { validation } from '../../middleware/validation.js'
import { createCategorySchema , getCategorySchema , updateCategorySchema } from './category.validation.js'
import { uploadSingleFile } from '../../middleware/fileupload.js'



const categoryRouter = express.Router()

// uploadSingleFile('image','category') post 

categoryRouter.use('/:categordId/subcategories', subCategoryRouter)
categoryRouter.route('/').get(getAllCategories).post(uploadSingleFile('image','category'),validation(createCategorySchema),createCategory)
categoryRouter.route('/:id').get(validation(getCategorySchema),getCategory).delete(deleteCategory).patch(validation(updateCategorySchema),updateCategory)


export default categoryRouter