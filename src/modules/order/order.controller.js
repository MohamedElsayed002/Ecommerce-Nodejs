import AppError from "../../utils/AppError.js";
import { AppFeature } from "../../utils/AppFeatures.js";
import {cartModel} from '../../../database/models/cart.model.js'
import { productModel } from "../../../database/models/product.model.js";
import {couponModel} from '../../../database/models/coupun.model.js'
import { orderModel } from "../../../database/models/order.model.js";
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const catchAsync = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch((err) => {
            // res.json(err)
            next(err)
        })
    }
}




const createCashOrder = catchAsync(async (req,res,next) => {

  // 1) get cart (cart ID)
  const cart = await  cartModel.findById(req.params.id)

  // 2) calc total price
  const totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
  // 3) create order
  const order = new orderModel({
    user : req.user._id,
    cartItems : cart.cartItems,
    totalOrderPrice,
    shippingAddress : req.body.shippingAddress,
  })

  await order.save()
  // 4) increment sold & decrement quantity
  if(order) {
      let options = cart.cartItems.map((item) => ({
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
        },
      }));


                productModel.bulkWrite(options);

                // 5) clear user
                await cartModel.findByIdAndDelete(req.params.id);
    // return res.status(201).json({ message: "success", order });

    }
    // else {
    //   return next(new AppError('error in cart id' , 404))
    // }

    return res.status(201).json({ message: "success", order });

})

const getSpecificOrder = catchAsync(async (req,res,next) => {
  let order = await orderModel.findOne({user : req.user._id}).populate('cartItems.product')
  res.status(200).json({message : "success" , order})
})


const getAllOrder = catchAsync(async (req, res, next) => {
  let orders = await orderModel
    .find()
    .populate("cartItems.product");
  res.status(200).json({ message: "success", orders });
});







export { createCashOrder, getSpecificOrder, getAllOrder };