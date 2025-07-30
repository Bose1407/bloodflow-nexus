import React from 'react';
import { Calendar } from 'lucide-react';

const Drives = () => {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Donation Drives</h1>
          <p className="mt-2 text-sm text-gray-700">
            Organize and manage blood donation drives.
          </p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center">
            <Calendar className="mx-auto h-12 w-12 text-red-600" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Donation Drives</h3>
            <p className="mt-1 text-sm text-gray-500">
              Drive management functionality coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drives;