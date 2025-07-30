CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR UNIQUE,
  password_hash TEXT,
  role VARCHAR CHECK (role IN ('customer', 'restaurant', 'agent', 'admin')),
  address TEXT
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  owner_id INT REFERENCES users(id),
  name VARCHAR,
  description TEXT,
  address TEXT
);

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  restaurant_id INT REFERENCES restaurants(id),
  name VARCHAR,
  description TEXT,
  price DECIMAL,
  image_url TEXT
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES users(id),
  restaurant_id INT REFERENCES restaurants(id),
  agent_id INT REFERENCES users(id),
  status VARCHAR CHECK (status IN ('pending', 'accepted', 'preparing', 'enroute', 'delivered', 'cancelled')),
  total DECIMAL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  menu_item_id INT REFERENCES menu_items(id),
  quantity INT
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  sender_id INT REFERENCES users(id),
  content TEXT,
  timestamp TIMESTAMP DEFAULT now()
);
