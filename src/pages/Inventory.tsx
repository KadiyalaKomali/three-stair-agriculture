import React, { useState } from 'react';
import { Plus, Package, AlertTriangle, TrendingDown, Search } from 'lucide-react';
import { mockInventory } from '../services/mockData';
import { Inventory as InventoryType } from '../types';

export const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryType[]>(mockInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fish_feed', label: 'Fish Feed' },
    { value: 'hen_feed', label: 'Hen Feed' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'equipment', label: 'Equipment' }
  ];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventory.filter(item => item.currentStock <= item.minThreshold);

  const getStockStatus = (current: number, min: number) => {
    if (current <= min) return 'critical';
    if (current <= min * 1.5) return 'low';
    return 'good';
  };

  const getStockBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'critical':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'low':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'good':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fish_feed':
        return '🐟';
      case 'hen_feed':
        return '🐓';
      case 'medicine':
        return '💊';
      case 'equipment':
        return '⚙️';
      default:
        return '📦';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-sm text-gray-600">Track feed, medicine, and equipment stock levels</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-indigo-500" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-indigo-600">{inventory.length}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
              <div className="text-sm text-gray-600">Low Stock Alerts</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-yellow-600">
                ${inventory.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-green-600">
                {inventory.filter(item => getStockStatus(item.currentStock, item.minThreshold) === 'good').length}
              </div>
              <div className="text-sm text-gray-600">Well Stocked</div>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-sm font-medium text-red-800">Low Stock Alert</h3>
          </div>
          <div className="mt-2 text-sm text-red-700">
            {lowStockItems.length} item{lowStockItems.length > 1 ? 's' : ''} require restocking:
            <span className="ml-1 font-medium">
              {lowStockItems.map(item => item.itemName).join(', ')}
            </span>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Inventory Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Threshold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost/Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => {
                const status = getStockStatus(item.currentStock, item.minThreshold);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{getCategoryIcon(item.category)}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.itemName}</div>
                          <div className="text-sm text-gray-500">{item.unit}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">
                        {item.category.replace('_', ' ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.currentStock} {item.unit}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.minThreshold} {item.unit}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStockBadge(status)}>
                        {status === 'critical' ? 'Critical' : status === 'low' ? 'Low Stock' : 'Good'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.costPerUnit.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.supplier}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(item.lastUpdated).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};