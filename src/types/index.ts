export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager';
}

export interface Fish {
  id: string;
  species: string;
  quantity: number;
  dateAdded: string;
  currentWeight: number;
  targetWeight: number;
  healthStatus: 'healthy' | 'sick' | 'critical';
  mortality: number;
}

export interface Poultry {
  id: string;
  type: string;
  count: number;
  age: number;
  healthStatus: 'healthy' | 'sick' | 'critical';
  mortality: number;
  dateAdded: string;
}

export interface EggProduction {
  id: string;
  date: string;
  eggsCollected: number;
  brokenEggs: number;
  henCount: number;
}

export interface SolarData {
  id: string;
  date: string;
  powerGenerated: number;
  batteryLevel: number;
  consumption: number;
  efficiency: number;
}

export interface Inventory {
  id: string;
  itemName: string;
  category: 'fish_feed' | 'hen_feed' | 'medicine' | 'equipment';
  currentStock: number;
  minThreshold: number;
  unit: string;
  lastUpdated: string;
  supplier: string;
  costPerUnit: number;
}

export interface DashboardStats {
  fishCount: number;
  henCount: number;
  eggsToday: number;
  solarPowerToday: number;
  fishTrend: number;
  henTrend: number;
  eggTrend: number;
  solarTrend: number;
}