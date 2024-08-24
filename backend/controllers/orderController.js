const Order = require("../models/orderModels");
const Product = require("../models/productModel");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

//Creating a new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const { shippingInfo, orderItems, paymentInfo, itemsPrice, shippingPrice, totalPrice } = req.body

  const order = await Order.create({
    shippingInfo, orderItems, paymentInfo, itemsPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id,
  });

  res.status(200).json({ success: true, message: "Order placed successfully!", order });
});

//Get order details
exports.getOrderDetails = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler(`Oops, No orders found with ID: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//Get all orders (Total orders made by User)
exports.myOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    message: "Fetched all the details.",
    orders,
  });

});

//Admin access - get all orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;

  });

  res.status(200).json({ success: true, totalAmount, orders, })
});

//Admin Update status
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(`Oops, No orders found with ID: ${req.params.id}`, 404))
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("This product has been delivered", 400))
  }
  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now()
  }
  await order.save({ new: true, runValidators: true });
  res.status(200).json({
    success: true,
    message: `Yay! your order has been ${order.orderStatus} at ${order.shippingInfo.address}! Have a good one.`
  })
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity
  await product.save({ new: true, runValidators: true })
}

//Delete order -- admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(`Oops, No orders found with ID: ${req.params.id}`, 404));
  }

  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "This order has been deleted successfully"
  });
});
