

import express from 'express'
import {createBrand , getAllBrands , getBrand , updateBrand , deleteBrand} from './brand.controller.js'
import { validation } from '../../middleware/validation.js'
import { createBrandSchema } from './brand.validation.js'
import { uploadSingleFile } from '../../middleware/fileupload.js'

const brandRouter = express.Router()





brandRouter.route('/').get(getAllBrands).post(uploadSingleFile('image','brands'),validation(createBrandSchema),createBrand)
brandRouter.route('/:id').get(getBrand).patch(updateBrand).delete(deleteBrand)


export default brandRouter