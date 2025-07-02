import { Fish, Poultry, EggProduction, SolarData, Inventory, DashboardStats } from '../types/types';

// Fish Data
export const getFishData = async (): Promise<Fish[]> => {
  try {
    const response = await fetch("https://three-stair-agriculture.onrender.com/fish");
    if (!response.ok) throw new Error("Failed to fetch fish");
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Using mock fish data due to error:", error);
    return [
      {
        id: '1',
        species: 'Tilapia',
        quantity: 450,
        dateAdded: '2024-01-15',
        currentWeight: 0.8,
        targetWeight: 1.2,
        healthStatus: 'healthy',
        mortality: 8
      },
      {
        id: '2',
        species: 'Catfish',
        quantity: 320,
        dateAdded: '2024-02-01',
        currentWeight: 1.1,
        targetWeight: 1.8,
        healthStatus: 'healthy',
        mortality: 5
      },
      {
        id: '3',
        species: 'Carp',
        quantity: 280,
        dateAdded: '2024-01-28',
        currentWeight: 0.9,
        targetWeight: 1.5,
        healthStatus: 'sick',
        mortality: 12
      }
    ];
  }
};

// Add more async functions like this for poultry, solar, etc. when backend is ready

// Chart Data Generator
export const generateChartData = () => {
  const data = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      eggs: Math.floor(Math.random() * 50) + 250,
      fish: Math.floor(Math.random() * 100) + 1000,
      solar: Math.floor(Math.random() * 20) + 35,
    });
  }
  return data;
};
