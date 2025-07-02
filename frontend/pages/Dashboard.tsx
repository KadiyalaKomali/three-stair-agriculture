// ✅ frontend/pages/dashboard.tsx
import React, { useEffect, useState } from 'react';
import { getFishData, getPoultryData, getSolarData } from '../services/mockData';
import { Fish, Poultry, SolarData } from '../types/types';
import { FishIcon, SunIcon, EggIcon, DrumstickIcon } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [fishCount, setFishCount] = useState<number>(0);
  const [poultryCount, setPoultryCount] = useState<number>(0);
  const [solarToday, setSolarToday] = useState<number>(0);

  useEffect(() => {
    getFishData().then((data: Fish[]) => setFishCount(data.length));
    getPoultryData().then((data: Poultry[]) => {
      const total = data.reduce((sum, entry) => sum + entry.count, 0);
      setPoultryCount(total);
    });
    getSolarData().then((data: SolarData[]) => {
      const latest = data[data.length - 1];
      if (latest?.powerGenerated) setSolarToday(latest.powerGenerated);
    });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">🌾 EcoTriFarm Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fish */}
        <div className="bg-white rounded-2xl shadow-md border p-6 flex items-center space-x-4">
          <FishIcon className="text-blue-500 w-10 h-10" />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Fish Count</h2>
            <p className="text-2xl font-bold">{fishCount}</p>
          </div>
        </div>

        {/* Poultry */}
        <div className="bg-white rounded-2xl shadow-md border p-6 flex items-center space-x-4">
          <DrumstickIcon className="text-yellow-600 w-10 h-10" />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Poultry Count</h2>
            <p className="text-2xl font-bold">{poultryCount}</p>
          </div>
        </div>

        {/* Solar */}
        <div className="bg-white rounded-2xl shadow-md border p-6 flex items-center space-x-4">
          <SunIcon className="text-orange-500 w-10 h-10" />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Solar Power Today</h2>
            <p className="text-2xl font-bold">{solarToday} kWh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
