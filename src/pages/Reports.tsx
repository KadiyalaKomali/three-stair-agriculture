import React, { useState } from 'react';
import { Download, FileText, Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const reportData = {
  monthlyEggs: [
    { month: 'Jan', eggs: 8750, revenue: 4375 },
    { month: 'Feb', eggs: 9200, revenue: 4600 },
    { month: 'Mar', eggs: 8900, revenue: 4450 },
    { month: 'Apr', eggs: 9500, revenue: 4750 },
    { month: 'May', eggs: 9800, revenue: 4900 },
    { month: 'Jun', eggs: 9300, revenue: 4650 }
  ],
  fishProduction: [
    { species: 'Tilapia', count: 450, weight: 360 },
    { species: 'Catfish', count: 320, weight: 352 },
    { species: 'Carp', count: 280, weight: 252 }
  ],
  solarEfficiency: [
    { name: 'Efficient Days', value: 75, color: '#10b981' },
    { name: 'Low Efficiency', value: 20, color: '#f59e0b' },
    { name: 'System Down', value: 5, color: '#ef4444' }
  ]
};

export const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('overview');

  const generateReport = (type: string) => {
    // Mock report generation
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${type}_report_${timestamp}.csv`;
    
    // In a real app, this would generate and download the actual file
    alert(`Generating ${type} report: ${filename}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-600">Generate insights and export data from your farm operations</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </button>
        </div>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { id: 'overview', name: 'Overview', icon: '📊' },
          { id: 'fish', name: 'Fish Production', icon: '🐟' },
          { id: 'poultry', name: 'Poultry & Eggs', icon: '🥚' },
          { id: 'solar', name: 'Solar Energy', icon: '☀️' }
        ].map(report => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`p-4 rounded-xl border text-left transition-colors ${
              selectedReport === report.id
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl mb-2">{report.icon}</div>
            <div className="font-medium">{report.name}</div>
          </button>
        ))}
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Egg Production */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Egg Production</h3>
            <button
              onClick={() => generateReport('egg_production')}
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData.monthlyEggs}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#666" />
              <YAxis tick={{ fontSize: 12 }} stroke="#666" />
              <Tooltip formatter={(value: number, name: string) => [
                name === 'eggs' ? `${value} eggs` : `$${value}`,
                name === 'eggs' ? 'Eggs Produced' : 'Revenue'
              ]} />
              <Bar dataKey="eggs" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fish Production by Species */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Fish Production by Species</h3>
            <button
              onClick={() => generateReport('fish_production')}
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData.fishProduction}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="species" tick={{ fontSize: 12 }} stroke="#666" />
              <YAxis tick={{ fontSize: 12 }} stroke="#666" />
              <Tooltip formatter={(value: number, name: string) => [
                name === 'count' ? `${value} fish` : `${value} kg`,
                name === 'count' ? 'Fish Count' : 'Total Weight'
              ]} />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Solar System Efficiency */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Solar System Efficiency</h3>
            <button
              onClick={() => generateReport('solar_efficiency')}
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reportData.solarEfficiency}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {reportData.solarEfficiency.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Statistics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Total Fish Harvested</span>
              <span className="text-sm font-bold text-blue-600">964 kg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Total Eggs Produced</span>
              <span className="text-sm font-bold text-yellow-600">55,450</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Solar Energy Generated</span>
              <span className="text-sm font-bold text-green-600">1,247 kWh</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Total Revenue</span>
              <span className="text-sm font-bold text-purple-600">$34,725</span>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => generateReport('comprehensive')}
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-6 w-6 text-indigo-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Comprehensive Report</div>
              <div className="text-sm text-gray-500">All data in PDF format</div>
            </div>
          </button>
          <button
            onClick={() => generateReport('financial')}
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="h-6 w-6 text-green-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Financial Summary</div>
              <div className="text-sm text-gray-500">Revenue and costs</div>
            </div>
          </button>
          <button
            onClick={() => generateReport('operational')}
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-6 w-6 text-blue-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Operational Data</div>
              <div className="text-sm text-gray-500">Production metrics</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};