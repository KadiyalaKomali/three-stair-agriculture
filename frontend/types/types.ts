export interface Fish {
  id: string;
  species: string;
  quantity: number;
  dateAdded: string;
  currentWeight: number;
  targetWeight: number;
  healthStatus: string;
  mortality: number;
}

export interface Poultry {
  id: string;
  type: string;
  count: number;
  age: number;
  healthStatus: string;
  mortality: number;
  dateAdded: string;
}

export interface SolarData {
  id: string;
  date: string;
  powerGenerated: number;
  batteryLevel: number;
  consumption: number;
  efficiency: number;
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
