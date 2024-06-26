import asyncHanlder from "../middleware/asyncHandler.js";
import Order from "../models/OrderModel.js";

// @desc Create new Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHanlder(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
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
  const orders = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

// @desc update order to paid
// @route Put /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHanlder(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updateOrder = await order.save();
    res.status(200).json(updateOrder);
  }
});

// @desc update order to delivered
// @route Put /api/orders/:id/deliver
// @access Private/admin
const updateOrderToDelevered = asyncHanlder(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc get All Orders
// @route GET /api/orders
// @access Private/admin
const getOrders = asyncHanlder(async (req, res) => {
  const Orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(Orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelevered,
  getOrders,
};
