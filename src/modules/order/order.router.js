

import express from 'express'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import {
  createCashOrder,
  getSpecificOrder,
  getAllOrder,
} from "./order.controller.js";

const orderRouter = express.Router()



orderRouter.get("/all", getAllOrder);

orderRouter
  .route("/")
  .get(protectedRoutes, allowedTo("user", "admin"), getSpecificOrder);

//   .get(protectedRoutes, allowedTo("admin", "user"), getLoggedUserCart)
//   .post(protectedRoutes, allowedTo("admin", "user"), addProductToCart)
//   .put(protectedRoutes, allowedTo("admin", "user"), applyCoupon);

orderRouter
  .route("/:id")
  .post(protectedRoutes, allowedTo("user", "admin"), createCashOrder)


export default orderRouter