// frontend/pages/Inventory.tsx
import React, { useEffect, useState } from "react";
import { Inventory } from "../types/types";
import { mockInventory } from "../services/mockData";

export default function InventoryPage() {
  const [inventory, setInventory] = useState<Inventory[]>([]);

  useEffect(() => {
    setInventory(mockInventory); // Replace with API later
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inventory.map((item) => (
          <div key={item.id} className="bg-white p-4 shadow rounded-xl">
            <h3 className="text-lg font-semibold mb-2">{item.itemName}</h3>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Stock:</strong> {item.currentStock} {item.unit}</p>
            <p><strong>Threshold:</strong> {item.minThreshold}</p>
            <p><strong>Updated:</strong> {item.lastUpdated}</p>
            <p><strong>Supplier:</strong> {item.supplier}</p>
            <p><strong>Unit Cost:</strong> ₹{item.costPerUnit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
