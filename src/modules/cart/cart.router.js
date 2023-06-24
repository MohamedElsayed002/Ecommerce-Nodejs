

import express from 'express'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import {
  addProductToCart,
  removeProductFromCart,
  updateQuantity,
  applyCoupon,
  getLoggedUserCart,
} from "./cart.controller.js";

const CartRouter = express.Router()





CartRouter.route("/")
  .get(protectedRoutes, allowedTo("admin", "user"), getLoggedUserCart)
  .post(protectedRoutes, allowedTo("admin", "user"), addProductToCart)
  .put(protectedRoutes, allowedTo("admin", "user"), applyCoupon);

CartRouter.route("/:id")
  .delete(protectedRoutes, allowedTo("user", "admin"), removeProductFromCart)
  .put(protectedRoutes, allowedTo("user", "admin"), updateQuantity);


export default CartRouter