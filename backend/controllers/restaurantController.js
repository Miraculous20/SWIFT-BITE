// controllers/restaurantController.js
const db = require("../db");

const getAllRestaurants = async (req, res) => {
  const result = await db.query("SELECT * FROM restaurants");
  res.json(result.rows);
};

const getMenuByRestaurant = async (req, res) => {
  const { id } = req.params;
  const result = await db.query("SELECT * FROM menu_items WHERE restaurant_id = $1", [id]);
  res.json(result.rows);
};

const createRestaurant = async (req, res) => {
  const { name, description, address } = req.body;
  const ownerId = req.user.id;
  const result = await db.query(
    "INSERT INTO restaurants (owner_id, name, description, address) VALUES ($1, $2, $3, $4) RETURNING *",
    [ownerId, name, description, address]
  );
  res.status(201).json(result.rows[0]);
};

const addMenuItem = async (req, res) => {
  const { id: restaurantId } = req.params;
  const { name, description, price, image_url } = req.body;
  const result = await db.query(
    "INSERT INTO menu_items (restaurant_id, name, description, price, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [restaurantId, name, description, price, image_url]
  );
  res.status(201).json(result.rows[0]);
};

module.exports = {
  getAllRestaurants,
  getMenuByRestaurant,
  createRestaurant,
  addMenuItem,
};
