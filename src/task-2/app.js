const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();
app.use(bodyParser.json());

// Create a new warehouse
app.post('/warehouse', async (req, res) => {
  const { name, location, capacity } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO warehouses (name, location, capacity) VALUES ($1, $2, $3) RETURNING *',
      [name, location, capacity]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error creating warehouse' });
  }
});

// Add a new product
app.post('/product', async (req, res) => {
  const { sku, name, description, category } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (sku, name, description, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [sku, name, description, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error adding product' });
  }
});

// Add or update inventory for a product in a specific warehouse
app.post('/inventory', async (req, res) => {
  const { product_id, warehouse_id, quantity } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO inventory (product_id, warehouse_id, quantity) 
       VALUES ($1, $2, $3)
       ON CONFLICT (product_id, warehouse_id) 
       DO UPDATE SET quantity = EXCLUDED.quantity 
       RETURNING *`,
      [product_id, warehouse_id, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error adding/updating inventory' });
  }
});

// Get the current stock of a product across all warehouses
app.get('/inventory', async (req, res) => {
  const { sku } = req.query;
  try {
    const productResult = await pool.query(
      'SELECT id FROM products WHERE sku = $1',
      [sku]
    );
    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const productId = productResult.rows[0].id;
    const result = await pool.query(
      `SELECT w.name AS warehouse_name, i.quantity 
       FROM inventory i 
       JOIN warehouses w ON i.warehouse_id = w.id 
       WHERE i.product_id = $1`,
      [productId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching inventory' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Warehouse Management API running on port ${port}`);
});
