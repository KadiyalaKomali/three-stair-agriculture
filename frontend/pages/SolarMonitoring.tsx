import React, { useState } from 'react';
import { Plus, Sun, Battery, Zap, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { mockSolarData } from '../services/mockData';
import { SolarData } from '../types/types';

export const SolarMonitoring: React.FC = () => {
  const [solarData, setSolarData] = useState<SolarData[]>(mockSolarData);
  const [showAddModal, setShowAddModal] = useState(false);

  const currentData = solarData[solarData.length - 1];
  const totalGeneration = solarData.reduce((sum, data) => sum + data.powerGenerated, 0);
  const avgEfficiency = solarData.reduce((sum, data) => sum + data.efficiency, 0) / solarData.length;
  const totalConsumption = solarData.reduce((sum, data) => sum + data.consumption, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Solar Monitoring</h1>
          <p className="text-sm text-gray-600">Track solar power generation and energy consumption</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Reading
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <Sun className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-yellow-600">{currentData?.powerGenerated.toFixed(1)} kWh</div>
              <div className="text-sm text-gray-600">Today's Generation</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <Battery className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-blue-600">{currentData?.batteryLevel}%</div>
              <div className="text-sm text-gray-600">Battery Level</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-purple-600">{currentData?.consumption.toFixed(1)} kWh</div>
              <div className="text-sm text-gray-600">Consumption</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-green-600">{avgEfficiency.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Avg Efficiency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Power Generation Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Power Generation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={solarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#666"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#666" />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number) => [`${value} kWh`, 'Power Generated']}
              />
              <Area 
                type="monotone" 
                dataKey="powerGenerated" 
                stroke="#10b981" 
                fill="#10b981"
                fillOpacity={0.3}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Battery Level Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Battery Level Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={solarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#666"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#666" domain={[0, 100]} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number) => [`${value}%`, 'Battery Level']}
              />
              <Line 
                type="monotone" 
                dataKey="batteryLevel" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Power vs Consumption */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generation vs Consumption</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={solarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#666"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#666" />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number, name: string) => [`${value} kWh`, name === 'powerGenerated' ? 'Generated' : 'Consumed']}
              />
              <Line 
                type="monotone" 
                dataKey="powerGenerated" 
                stroke="#10b981" 
                strokeWidth={3}
                name="powerGenerated"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="consumption" 
                stroke="#f59e0b" 
                strokeWidth={3}
                name="consumption"
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Solar Data</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Power Generated (kWh)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Battery Level (%)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Consumption (kWh)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Efficiency (%)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Energy
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {solarData.slice().reverse().map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.powerGenerated.toFixed(1)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900 mr-2">{record.batteryLevel}%</div>
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            record.batteryLevel > 80 ? 'bg-green-500' : 
                            record.batteryLevel > 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${record.batteryLevel}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.consumption.toFixed(1)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.efficiency}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      record.powerGenerated > record.consumption ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {(record.powerGenerated - record.consumption).toFixed(1)} kWh
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};