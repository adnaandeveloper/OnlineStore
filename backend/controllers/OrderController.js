import asyncHanlder from "../middleware/asyncHandler.js";
import Order from "../models/OrderModel.js";

// @desc Create new Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHanlder(async (req, res) => {
  res.send("add order items");
});

// @desc Get loggedin user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHanlder(async (req, res) => {
  res.send("get my orders");
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHanlder(async (req, res) => {
  res.send("get order by id");
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
