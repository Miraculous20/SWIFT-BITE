// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getUserOrders,
  updateOrderStatus
} = require("../controllers/orderController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/", authenticate, placeOrder);
router.get("/", authenticate, getUserOrders);
router.patch("/:id/status", authenticate, updateOrderStatus);

module.exports = router;
