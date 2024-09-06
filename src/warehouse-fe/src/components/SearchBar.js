import React, { useState } from 'react';

function SearchBar({ fetchInventory }) {
  const [sku, setSku] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (sku) {
      fetchInventory(sku);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Enter Product SKU"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
