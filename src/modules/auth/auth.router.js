

import express from 'express'
import { signup , signIn , protectedRoutes } from './auth.controller.js'


const authRouter = express.Router()




authRouter.post('/register' ,signup)
authRouter.post('/login', signIn)





export default authRouter