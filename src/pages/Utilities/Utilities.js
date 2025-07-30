import React from 'react';
import { Calculator } from 'lucide-react';

const Utilities = () => {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Utilities</h1>
          <p className="mt-2 text-sm text-gray-700">
            Blood compatibility checker and donor eligibility tools.
          </p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center">
            <Calculator className="mx-auto h-12 w-12 text-red-600" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Utilities</h3>
            <p className="mt-1 text-sm text-gray-500">
              Utility tools functionality coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Utilities;