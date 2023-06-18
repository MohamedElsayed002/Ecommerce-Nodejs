

import express from 'express'
import {createSubCategory,
    getAllSubCategories, 
    getSubCategory , 
    updateSubCategory , 
    deleteSubCategory} from './subcategory.controller.js'
const subCategoryRouter = express.Router({mergeParams : true})



subCategoryRouter.route('/').get(getAllSubCategories).post(createSubCategory)
subCategoryRouter.route('/:id').get(getSubCategory).delete(deleteSubCategory).patch(updateSubCategory)



export default subCategoryRouter