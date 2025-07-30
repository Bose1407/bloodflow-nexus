import React from 'react';
import { useQuery } from 'react-query';
import { inventoryAPI } from '../../services/api';
import { Droplets } from 'lucide-react';

const Inventory = () => {
  const { data, isLoading } = useQuery('inventory', inventoryAPI.getAll);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Blood Inventory</h1>
          <p className="mt-2 text-sm text-gray-700">
            Current blood inventory status and availability.
          </p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center">
            <Droplets className="mx-auto h-12 w-12 text-red-600" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Blood Inventory</h3>
            <p className="mt-1 text-sm text-gray-500">
              Inventory management functionality coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;