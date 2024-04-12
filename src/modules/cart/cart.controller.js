import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { AppFeature } from "../../utils/AppFeatures.js";
import {cartModel} from '../../../database/models/cart.model.js'
import { productModel } from "../../../database/models/product.model.js";
import {couponModel} from '../../../database/models/coupun.model.js'
const catchAsync = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch((err) => {
            // res.json(err)
            next(err)
        })
    }
}

// 63 Apply Coupon

function calcTotalPrice (cart) {
        let totalPrice = 0;
        cart.cartItems.forEach((elm) => {
          totalPrice += elm.quantity * elm.price;
        });

        cart.totalPrice = totalPrice;
}


const addProductToCart = catchAsync(async (req,res,next) => {


    let product = await productModel.findById(req.body.product)
    if(!product) return next(new AppError('product not found' , 401))
    req.body.price = product.price
    let isCartExist = await cartModel.findOne({user : req.user._id})
    console.log(product.price)
    if(!isCartExist) {
        let result = new cartModel({
            user : req.user._id,
            cartItems : [req.body],
        })
        calcTotalPrice(result);
        await result.save()
        return res.json({message : "success" , result })
    }
    let item = isCartExist.cartItems.find((elm) => elm.product == req.body.product)
    if(item) {
        item.quantity += 1
        
    }else {
        isCartExist.cartItems.push(req.body)
    }


    calcTotalPrice(isCartExist);

    if(isCartExist.discount) {
       isCartExist.totalPriceAfterDiscount = isCartExist.totalPrice - (isCartExist.totalPrice * isCartExist.discount) /100
    }

    await isCartExist.save()
    res.json({message : "success" , cart : isCartExist})
})


const removeProductFromCart = catchAsync(async (req, res, next) => {
  let result = await cartModel.findOneAndUpdate(
    {user : req.user._id},
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  );
  if (!result) {
    return next(
      new AppError(
        "product not found or you are not authorized to perform this action",
        404
      )
    );
  }

    calcTotalPrice(result);

    if(result.discount) {
       result.totalPriceAfterDiscount = result.totalPrice - (result.totalPrice * result.discount) /100
    }

    
  res.json({ message: "success", result: result });
});



const updateQuantity = catchAsync(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) return next(new AppError("product not found", 401));

  let isCartExist = await cartModel.findOne({user : req.user._id})

  let item = isCartExist.cartItems.find(elm => elm.product == req.params.id)

  if(item) {
    item.quantity = req.body.quantity
  }

  calcTotalPrice(isCartExist);
    if(isCartExist.discount) {
       isCartExist.totalPriceAfterDiscount = isCartExist.totalPrice - (isCartExist.totalPrice * isCartExist.discount) /100
    }

    
  await isCartExist.save();
  res.json({ message: "success", cart: isCartExist });
});


const applyCoupon = catchAsync(async (req,res,next) => {

  let coupon = await couponModel.findOne({code : req.body.code , expires : {$gt : Date.now()}})
  console.log(coupon)
  let cart = await cartModel.findOne({user : req.user._id})

  cart.totalPriceDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
  await cart.save()
  res.status(201).json({message : 'success', cart})

})


const getLoggedUserCart = catchAsync(async (req, res, next) => {

  let  cartItem = await cartModel.findOne({ user: req.user._id }).populate('cartItems.product');



  res.json({ message: "success", cart: cartItem });
});


export {
  addProductToCart,
  removeProductFromCart,
  updateQuantity,
  applyCoupon,
  getLoggedUserCart,
};
