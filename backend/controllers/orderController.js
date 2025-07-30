// controllers/orderController.js
const db = require("../db");

const placeOrder = async (req, res) => {
  const { restaurant_id, items, total } = req.body;
  const customer_id = req.user.id;

  // Assign dummy delivery agent (logic can be enhanced later)
  const agentResult = await db.query(
    "SELECT id FROM users WHERE role = 'agent' LIMIT 1"
  );
  const agent_id = agentResult.rows[0]?.id || null;

  const orderResult = await db.query(
    "INSERT INTO orders (customer_id, restaurant_id, agent_id, status, total) VALUES ($1, $2, $3, 'pending', $4) RETURNING id",
    [customer_id, restaurant_id, agent_id, total]
  );

  const order_id = orderResult.rows[0].id;

  for (let item of items) {
    await db.query(
      "INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)",
      [order_id, item.menu_item_id, item.quantity]
    );
  }

  res.status(201).json({ order_id });
};

const getUserOrders = async (req, res) => {
  const user_id = req.user.id;
  const role = req.user.role;
  let result;

  if (role === "customer") {
    result = await db.query("SELECT * FROM orders WHERE customer_id = $1", [user_id]);
  } else if (role === "agent") {
    result = await db.query("SELECT * FROM orders WHERE agent_id = $1", [user_id]);
  } else if (role === "restaurant") {
    result = await db.query(
      "SELECT * FROM orders WHERE restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = $1)",
      [user_id]
    );
  } else {
    result = await db.query("SELECT * FROM orders"); // Admin
  }

  res.json(result.rows);
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await db.query("UPDATE orders SET status = $1 WHERE id = $2", [status, id]);
  res.json({ message: "Order status updated" });
};

module.exports = { placeOrder, getUserOrders, updateOrderStatus };
