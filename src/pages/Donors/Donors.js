import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { donorsAPI } from '../../services/api';
import { Users, Plus, Search } from 'lucide-react';

const Donors = () => {
  const { data, isLoading } = useQuery('donors', () => donorsAPI.getAll());

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const donors = data?.data?.donors || [];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Donors</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all registered blood donors.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/donors/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Donor
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {donors.map((donor) => (
            <li key={donor._id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium text-white bg-red-600`}>
                        {donor.bloodGroup}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {donor.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {donor.email} • {donor.phone}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {donor.totalDonations} donations
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {donors.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No donors</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new donor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donors;