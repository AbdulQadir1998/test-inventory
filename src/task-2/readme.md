## How to Run the API
### Database Setup:

Ensure you have PostgreSQL installed and running.
Create a database called warehouse_db and set up the tables by running the SQL commands mentioned earlier.

### Environment Setup:

Install the required packages: express, pg, and body-parser.
Configure your database connection in the pool object (db.js file).

### Run the Server:

```cd src/task-2```
```node app.js```

The server will run on http://localhost:3000.

## Testing the API Using Postman
### Here are the endpoints to test using Postman or any HTTP client:

#### Create a Warehouse:

Endpoint: POST /warehouse
Body (JSON):
```
  {
    "name": "Warehouse A",
    "location": "New York",
    "capacity": 500
  }
```
Response: Created warehouse object.

#### Add a Product:

Endpoint: POST /product
Body (JSON):
```
{
  "sku": "SKU123",
  "name": "Product A",
  "description": "Description of Product A",
  "category": "Electronics"
}
```
Response: Created product object.

#### Add/Update Inventory:

Endpoint: POST /inventory
Body (JSON):
```
{
  "product_id": 1,
  "warehouse_id": 1,
  "quantity": 100
}
```
Response: Updated inventory object.

#### Get Product Inventory Across Warehouses:

Endpoint: GET /inventory?sku=SKU123
Response: Stock details across all warehouses.
