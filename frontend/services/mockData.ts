import { Fish, Poultry, EggProduction, SolarData, Inventory, DashboardStats } from '../types';

// Mock data for demonstration
export const mockFish: Fish[] = [
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

export const mockPoultry: Poultry[] = [
  {
    id: '1',
    type: 'Rhode Island Red',
    count: 85,
    age: 18,
    healthStatus: 'healthy',
    mortality: 3,
    dateAdded: '2023-12-10'
  },
  {
    id: '2',
    type: 'Leghorn',
    count: 120,
    age: 24,
    healthStatus: 'healthy',
    mortality: 2,
    dateAdded: '2023-11-15'
  },
  {
    id: '3',
    type: 'Sussex',
    count: 95,
    age: 20,
    healthStatus: 'healthy',
    mortality: 1,
    dateAdded: '2023-12-05'
  }
];

export const mockEggProduction: EggProduction[] = [
  { id: '1', date: '2024-01-15', eggsCollected: 285, brokenEggs: 8, henCount: 300 },
  { id: '2', date: '2024-01-16', eggsCollected: 292, brokenEggs: 5, henCount: 300 },
  { id: '3', date: '2024-01-17', eggsCollected: 278, brokenEggs: 12, henCount: 300 },
  { id: '4', date: '2024-01-18', eggsCollected: 301, brokenEggs: 6, henCount: 300 },
  { id: '5', date: '2024-01-19', eggsCollected: 295, brokenEggs: 9, henCount: 300 },
  { id: '6', date: '2024-01-20', eggsCollected: 288, brokenEggs: 7, henCount: 300 },
  { id: '7', date: '2024-01-21', eggsCollected: 305, brokenEggs: 4, henCount: 300 }
];

export const mockSolarData: SolarData[] = [
  { id: '1', date: '2024-01-15', powerGenerated: 45.2, batteryLevel: 89, consumption: 38.5, efficiency: 92 },
  { id: '2', date: '2024-01-16', powerGenerated: 52.8, batteryLevel: 95, consumption: 41.2, efficiency: 94 },
  { id: '3', date: '2024-01-17', powerGenerated: 38.9, batteryLevel: 78, consumption: 39.8, efficiency: 88 },
  { id: '4', date: '2024-01-18', powerGenerated: 49.1, batteryLevel: 92, consumption: 42.3, efficiency: 91 },
  { id: '5', date: '2024-01-19', powerGenerated: 55.3, batteryLevel: 98, consumption: 44.1, efficiency: 96 },
  { id: '6', date: '2024-01-20', powerGenerated: 47.6, batteryLevel: 85, consumption: 40.9, efficiency: 90 },
  { id: '7', date: '2024-01-21', powerGenerated: 51.2, batteryLevel: 93, consumption: 43.7, efficiency: 93 }
];

export const mockInventory: Inventory[] = [
  {
    id: '1',
    itemName: 'Fish Feed Premium',
    category: 'fish_feed',
    currentStock: 450,
    minThreshold: 100,
    unit: 'kg',
    lastUpdated: '2024-01-20',
    supplier: 'Aqua Nutrition Ltd',
    costPerUnit: 2.5
  },
  {
    id: '2',
    itemName: 'Layer Feed',
    category: 'hen_feed',
    currentStock: 25,
    minThreshold: 50,
    unit: 'kg',
    lastUpdated: '2024-01-19',
    supplier: 'Poultry Plus',
    costPerUnit: 1.8
  },
  {
    id: '3',
    itemName: 'Antibiotics',
    category: 'medicine',
    currentStock: 12,
    minThreshold: 5,
    unit: 'bottles',
    lastUpdated: '2024-01-18',
    supplier: 'Vet Care Solutions',
    costPerUnit: 15.0
  },
  {
    id: '4',
    itemName: 'Water Pumps',
    category: 'equipment',
    currentStock: 3,
    minThreshold: 2,
    unit: 'units',
    lastUpdated: '2024-01-15',
    supplier: 'Farm Equipment Co',
    costPerUnit: 120.0
  }
];

export const mockDashboardStats: DashboardStats = {
  fishCount: 1050,
  henCount: 300,
  eggsToday: 305,
  solarPowerToday: 51.2,
  fishTrend: 2.5,
  henTrend: -0.8,
  eggTrend: 5.2,
  solarTrend: 8.1
};

// Generate chart data for the last 30 days
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