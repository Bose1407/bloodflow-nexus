import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { adminAPI, requestsAPI, drivesAPI, inventoryAPI } from '../../services/api';
import { 
  Users, 
  Droplets, 
  FileText, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  Clock,
  CheckCircle,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Fetch dashboard data based on user role
  const { data: dashboardData, isLoading } = useQuery(
    'dashboard',
    () => {
      if (user?.role === 'admin') {
        return adminAPI.getDashboard();
      }
      // For non-admin users, fetch basic data
      return Promise.all([
        requestsAPI.getAll({ limit: 5 }),
        drivesAPI.getAll({ limit: 5, upcoming: true }),
        inventoryAPI.getAll()
      ]).then(([requests, drives, inventory]) => ({
        data: {
          requests: requests.data,
          drives: drives.data,
          inventory: inventory.data
        }
      }));
    },
    {
      enabled: !!user,
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const isAdmin = user?.role === 'admin';
  const data = dashboardData?.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Welcome back, {user?.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500 capitalize">
            {user?.role} Dashboard
          </p>
        </div>
      </div>

      {/* Admin Stats */}
      {isAdmin && data?.stats && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Donors"
            value={data.stats.totalDonors}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Pending Requests"
            value={data.stats.pendingRequests}
            icon={FileText}
            color="yellow"
          />
          <StatCard
            title="Critical Requests"
            value={data.stats.criticalRequests}
            icon={AlertCircle}
            color="red"
          />
          <StatCard
            title="Active Drives"
            value={data.stats.activeDrives}
            icon={Calendar}
            color="green"
          />
        </div>
      )}

      {/* Blood Inventory Summary */}
      {data?.inventorySummary && (
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Droplets className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Blood Inventory Summary
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {data.inventorySummary.reduce((sum, item) => sum + item.totalUnits, 0)} Units
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-3">
            <div className="grid grid-cols-4 gap-4 text-sm">
              {data.inventorySummary.map((item) => (
                <div key={item._id} className="text-center">
                  <div className="font-medium text-gray-900">{item._id}</div>
                  <div className="text-gray-500">{item.totalUnits} units</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Requests */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Blood Requests
              </h3>
              <Link
                to="/requests"
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                View all
              </Link>
            </div>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {(data?.recentRequests || data?.requests?.requests || []).slice(0, 5).map((request) => (
                  <li key={request._id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                          request.urgency === 'critical' ? 'bg-red-600' :
                          request.urgency === 'high' ? 'bg-orange-500' :
                          request.urgency === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}>
                          {request.bloodGroup}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {request.patientName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {request.unitsNeeded} units • {request.urgency} priority
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                          request.status === 'fulfilled' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {(!data?.recentRequests && !data?.requests?.requests?.length) && (
              <div className="text-center py-4">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">No recent requests</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Drives */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Upcoming Donation Drives
              </h3>
              <Link
                to="/drives"
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                View all
              </Link>
            </div>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {(data?.drives?.drives || []).slice(0, 5).map((drive) => (
                  <li key={drive._id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Calendar className="h-8 w-8 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {drive.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(drive.startDate).toLocaleDateString()} • {drive.location?.city}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-sm text-gray-500">
                          {drive.registeredDonors}/{drive.targetDonors}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {!data?.drives?.drives?.length && (
              <div className="text-center py-4">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">No upcoming drives</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {user?.role === 'patient' && (
              <QuickActionCard
                title="Request Blood"
                description="Submit a new blood request"
                icon={Plus}
                to="/requests/new"
                color="red"
              />
            )}
            
            {(user?.role === 'admin' || user?.role === 'hospital') && (
              <>
                <QuickActionCard
                  title="Add Donor"
                  description="Register a new donor"
                  icon={Users}
                  to="/donors/new"
                  color="blue"
                />
                <QuickActionCard
                  title="Update Inventory"
                  description="Add blood inventory"
                  icon={Droplets}
                  to="/inventory/new"
                  color="green"
                />
                <QuickActionCard
                  title="Create Drive"
                  description="Organize donation drive"
                  icon={Calendar}
                  to="/drives/new"
                  color="purple"
                />
              </>
            )}
            
            <QuickActionCard
              title="View Reports"
              description="Check analytics"
              icon={TrendingUp}
              to="/reports"
              color="indigo"
            />
          </div>
        </div>
      </div>

      {/* Low Inventory Alerts */}
      {data?.lowInventory?.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Low Inventory Alert
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>The following blood types are running low:</p>
                <ul className="list-disc list-inside mt-1">
                  {data.lowInventory.map((item) => (
                    <li key={item._id}>
                      {item.bloodGroup}: {item.unitsAvailable} units remaining
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500'
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 text-white ${colorClasses[color]} rounded p-1`} />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-lg font-medium text-gray-900">
                {value}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({ title, description, icon: Icon, to, color }) => {
  const colorClasses = {
    red: 'text-red-600 bg-red-100 hover:bg-red-200',
    blue: 'text-blue-600 bg-blue-100 hover:bg-blue-200',
    green: 'text-green-600 bg-green-100 hover:bg-green-200',
    purple: 'text-purple-600 bg-purple-100 hover:bg-purple-200',
    indigo: 'text-indigo-600 bg-indigo-100 hover:bg-indigo-200'
  };

  return (
    <Link
      to={to}
      className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-500 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div>
        <span className={`rounded-lg inline-flex p-3 ring-4 ring-white ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default Dashboard;