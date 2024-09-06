import React from 'react';

function InventoryTable({ data }) {
  return (
    <table className="inventory-table">
      <thead>
        <tr>
          <th>Warehouse</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.warehouse_name}</td>
            <td>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventoryTable;
