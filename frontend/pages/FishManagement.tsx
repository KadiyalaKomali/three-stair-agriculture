// frontend/pages/FishPage.tsx
import React, { useEffect, useState } from "react";
import { Fish } from "../types/types";
import { getFishData } from "../services/mockData";

export default function FishPage() {
  const [fishList, setFishList] = useState<Fish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFish() {
      try {
        const data = await getFishData();
        setFishList(data);
      } catch (error) {
        console.error("Failed to fetch fish data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFish();
  }, []);

  if (loading) return <div className="p-6">Loading Fish Data...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Fish Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fishList.map((fish) => (
          <div key={fish.id} className="bg-white shadow p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">{fish.species}</h3>
            <p><strong>Quantity:</strong> {fish.quantity}</p>
            <p><strong>Added on:</strong> {fish.dateAdded}</p>
            <p><strong>Weight:</strong> {fish.currentWeight}kg / {fish.targetWeight}kg</p>
            <p><strong>Health:</strong> {fish.healthStatus}</p>
            <p><strong>Mortality:</strong> {fish.mortality}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
