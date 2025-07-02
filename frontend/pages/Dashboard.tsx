// frontend/pages/Dashboard.tsx
import React from "react";
import { mockDashboardStats, generateChartData } from "../services/mockData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const stats = mockDashboardStats;
  const chartData = generateChartData();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Fish" value={stats.fishCount} trend={stats.fishTrend} />
        <StatCard title="Hens" value={stats.henCount} trend={stats.henTrend} />
        <StatCard title="Eggs Today" value={stats.eggsToday} trend={stats.eggTrend} />
        <StatCard title="Solar (kWh)" value={stats.solarPowerToday} trend={stats.solarTrend} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Trends (Last 30 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="eggs" stroke="#f59e0b" name="Eggs" />
            <Line type="monotone" dataKey="fish" stroke="#3b82f6" name="Fish" />
            <Line type="monotone" dataKey="solar" stroke="#10b981" name="Solar" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend }: { title: string; value: number; trend: number }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-md font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`text-sm ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
        {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
      </p>
    </div>
  );
}
