
import express from 'express'
import * as dotenv from 'dotenv'
import { dbConnection } from './database/dbConnection.js'
import categoryRouter from './src/modules/category/category.router.js'
import morgan from 'morgan'
import AppError from './src/utils/AppError.js'
import subCategoryRouter from './src/modules/subcategory/subcategory.router.js'
import brandRouter from './src/modules/brands/brand.router.js'
import productsRouter from './src/modules/products/products.router.js'
import userRouter from './src/modules/user/user.router.js'
import authRouter from './src/modules/auth/auth.router.js'
import reviewRouter from './src/modules/reviews/review.router.js'
import wishListRouter from './src/modules/wishlist/wishlist.router.js'
import addressRouter from './src/modules/addresses/addresses.router.js'
import couponRouter from './src/modules/coupon/coupon.router.js'
import CartRouter from './src/modules/cart/cart.router.js'

dotenv.config()





const app = express()
dbConnection()

app.use(express.json())
app.use(express.static('uploads'))
app.use(morgan('dev'))

app.use('/api/v1/categories' , categoryRouter)
app.use('/api/v1/subcategory', subCategoryRouter)
app.use('/api/v1/brands' , brandRouter)
app.use('/api/v1/products' , productsRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth' , authRouter)
app.use('/api/v1/review' , reviewRouter)
app.use('/api/v1/wishlist' , wishListRouter)
app.use('/api/v1/address' , addressRouter)
app.use('/api/v1/coupon', couponRouter)
app.use('/api/v1/cart' , CartRouter)
app.get('/' , (req,res) => {
    res.send('Hi Mohamed')
})


app.all('*' , (req,res,next) => {
    // res.json({message : `can't find this route`})
    next(new AppError(`can't find this route ${req.originalUrl}` , 404))
})

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({message : err.message , statusCode})
})

app.listen(process.env.PORT , () => {
    console.log('listening on port')
}) 



// process.on('unhandledRejection' , (err) => {
//     console.log('unhandledRejection' , err)
// })