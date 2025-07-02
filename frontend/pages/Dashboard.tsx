import React from 'react';
import { Fish, Bird, Egg, Sun, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockDashboardStats, generateChartData } from '../services/mockData';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend: number;
  color: string;
}> = ({ title, value, icon: Icon, trend, color }) => {
  const isPositive = trend > 0;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
          {Math.abs(trend)}%
        </div>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const chartData = generateChartData();
  const stats = mockDashboardStats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farm Dashboard</h1>
          <p className="text-sm text-gray-600">Monitor your sustainable farming operations</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Activity className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Fish"
          value={stats.fishCount.toLocaleString()}
          icon={Fish}
          trend={stats.fishTrend}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Hens"
          value={stats.henCount.toLocaleString()}
          icon={Bird}
          trend={stats.henTrend}
          color="bg-orange-500"
        />
        <StatCard
          title="Eggs Today"
          value={stats.eggsToday.toLocaleString()}
          icon={Egg}
          trend={stats.eggTrend}
          color="bg-yellow-500"
        />
        <StatCard
          title="Solar Power (kWh)"
          value={stats.solarPowerToday.toFixed(1)}
          icon={Sun}
          trend={stats.solarTrend}
          color="bg-green-500"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Egg Production Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Egg Production</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
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
                formatter={(value: number) => [value, 'Eggs']}
              />
              <Line 
                type="monotone" 
                dataKey="eggs" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#f59e0b' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Fish Population Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fish Population Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
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
                formatter={(value: number) => [value, 'Fish']}
              />
              <Line 
                type="monotone" 
                dataKey="fish" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Solar Power Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Solar Power Generation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
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
                formatter={(value: number) => [`${value} kWh`, 'Solar Power']}
              />
              <Bar 
                dataKey="solar" 
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Fish className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Fish Survival Rate</span>
              </div>
              <span className="text-sm font-bold text-blue-600">97.2%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center">
                <Bird className="h-5 w-5 text-orange-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Egg Laying Rate</span>
              </div>
              <span className="text-sm font-bold text-orange-600">85.3%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Sun className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Solar Efficiency</span>
              </div>
              <span className="text-sm font-bold text-green-600">93.1%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">System Health</span>
              </div>
              <span className="text-sm font-bold text-purple-600">Excellent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};