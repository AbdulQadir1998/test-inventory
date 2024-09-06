import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import InventoryTable from './components/InventoryTable';
import './styles/App.css';

function App() {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInventory = async (sku) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/inventory?sku=${sku}`);
      const data = await response.json();
      if (response.ok) {
        setInventoryData(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to fetch inventory data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Warehouse Inventory Management</h1>
      <SearchBar fetchInventory={fetchInventory} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && inventoryData.length > 0 && <InventoryTable data={inventoryData} />}
    </div>
  );
}

export default App;
