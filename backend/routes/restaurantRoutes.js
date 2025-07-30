// routes/restaurantRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  getMenuByRestaurant,
  createRestaurant,
  addMenuItem
} = require("../controllers/restaurantController");
const authenticate = require("../middlewares/authMiddleware");

router.get("/", getAllRestaurants);
router.get("/:id/menu", getMenuByRestaurant);

// Authenticated routes
router.post("/", authenticate, createRestaurant);
router.post("/:id/menu", authenticate, addMenuItem);

module.exports = router;
