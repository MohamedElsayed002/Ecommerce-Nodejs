

import express from 'express'
import {createUser,getAllUsers,getUser,updateUser,deleteUser , changeUserPassword} from './user.controller.js'


const userRouter = express.Router()


userRouter.route('/').post(createUser).get(getAllUsers)
userRouter.route('/:id').get(getUser).delete(deleteUser).put(updateUser)
userRouter.patch('/changeUserPassword/:id' , changeUserPassword)



export default userRouter