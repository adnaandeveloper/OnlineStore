import asyncHanlder from "../middleware/asyncHandler.js";
import Order from "../models/OrderModel.js";

// @desc Create new Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHanlder(async (req, res) => {
  const {
    OrderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      OrderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();

    res.status(200).json(createOrder);
  }
});

// @desc Get loggedin user ordersgit
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHanlder(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHanlder(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(orders);
  } else {
    res.status(404), throw new Error("Order not found");
  }
});

// @desc update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHanlder(async (req, res) => {
  res.send("update order to paid ");
});

// @desc update order to delivered
// @route GET /api/orders/:id/deliver
// @access Private/admin
const updateOrderToDelevered = asyncHanlder(async (req, res) => {
  res.send("update order to paid ");
});

// @desc get All Orders
// @route GET /api/orders
// @access Private/admin
const getOrders = asyncHanlder(async (req, res) => {
  res.send("get all orders ");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelevered,
  getOrders,
};
