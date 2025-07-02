import { Fish, Poultry, SolarData } from '../types/types';

// ✅ FETCH FISH DATA (from backend or mock fallback)
export const getFishData = async (): Promise<Fish[]> => {
  try {
    const response = await fetch("https://three-stair-agriculture-backend.onrender.com/fish")

    if (!response.ok) throw new Error("Fetch failed");
    return await response.json();
  } catch (error) {
    console.warn("Failed to fetch fish from API, using mock data:", error);
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
      }
    ];
  }
};

// ✅ FETCH POULTRY DATA (mock only for now)
export const getPoultryData = async (): Promise<Poultry[]> => {
  return [
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
    }
  ];
};

// ✅ FETCH SOLAR DATA (returns mock data)
export const getSolarData = async (): Promise<SolarData[]> => {
  return mockSolarData;
};

// ✅ MOCK SOLAR DATA EXPORT (used in SolarMonitoring.tsx)
export const mockSolarData: SolarData[] = [
  {
    id: '1',
    date: '2024-01-15',
    powerGenerated: 45.2,
    batteryLevel: 89,
    consumption: 38.5,
    efficiency: 92
  },
  {
    id: '2',
    date: '2024-01-16',
    powerGenerated: 52.8,
    batteryLevel: 95,
    consumption: 41.2,
    efficiency: 94
  },
  {
    id: '3',
    date: '2024-01-17',
    powerGenerated: 38.9,
    batteryLevel: 78,
    consumption: 39.8,
    efficiency: 88
  },
  {
    id: '4',
    date: '2024-01-18',
    powerGenerated: 49.1,
    batteryLevel: 92,
    consumption: 42.3,
    efficiency: 91
  },
  {
    id: '5',
    date: '2024-01-19',
    powerGenerated: 55.3,
    batteryLevel: 98,
    consumption: 44.1,
    efficiency: 96
  },
  {
    id: '6',
    date: '2024-01-20',
    powerGenerated: 47.6,
    batteryLevel: 85,
    consumption: 40.9,
    efficiency: 90
  },
  {
    id: '7',
    date: '2024-01-21',
    powerGenerated: 51.2,
    batteryLevel: 93,
    consumption: 43.7,
    efficiency: 93
  }
];
