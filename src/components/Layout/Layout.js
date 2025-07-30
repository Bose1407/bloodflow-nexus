import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from 'react-query';
import { notificationsAPI } from '../../services/api';
import {
  Heart,
  Menu,
  X,
  Home,
  Users,
  Droplets,
  FileText,
  Calendar,
  Bell,
  Settings,
  Shield,
  BarChart3,
  Calculator,
  LogOut,
  User
} from 'lucide-react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch notifications count
  const { data: notificationsData } = useQuery(
    'notifications',
    () => notificationsAPI.getAll({ unread: true }),
    {
      enabled: !!user,
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  );

  const unreadCount = notificationsData?.data?.unreadCount || 0;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
      { name: 'Blood Inventory', href: '/inventory', icon: Droplets },
      { name: 'Blood Requests', href: '/requests', icon: FileText },
      { name: 'Donation Drives', href: '/drives', icon: Calendar },
      { name: 'Notifications', href: '/notifications', icon: Bell, badge: unreadCount },
      { name: 'Utilities', href: '/utilities', icon: Calculator },
    ];

    if (user?.role === 'admin') {
      baseItems.splice(1, 0, { name: 'Donors', href: '/donors', icon: Users });
      baseItems.push(
        { name: 'Admin Panel', href: '/admin', icon: Shield },
        { name: 'Reports', href: '/reports', icon: BarChart3 }
      );
    } else if (user?.role === 'hospital') {
      baseItems.splice(1, 0, { name: 'Donors', href: '/donors', icon: Users });
      baseItems.push({ name: 'Reports', href: '/reports', icon: BarChart3 });
    }

    return baseItems;
  };

  const navigation = getNavigationItems();

  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        
        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition ease-in-out duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <SidebarContent navigation={navigation} isActive={isActive} user={user} onLogout={handleLogout} />
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <SidebarContent navigation={navigation} isActive={isActive} user={user} onLogout={handleLogout} />
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white border-b border-gray-200">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarContent = ({ navigation, isActive, user, onLogout }) => {
  return (
    <>
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-red-600">
        <Heart className="h-8 w-8 text-white" />
        <span className="ml-2 text-xl font-bold text-white">BloodBank</span>
      </div>
      
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-red-100 text-red-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${
                    isActive(item.href) ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
                {item.badge > 0 && (
                  <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-red-100">
                <User className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
            
            <div className="mt-3 space-y-1">
              <Link
                to="/profile"
                className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
              >
                <Settings className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                Profile Settings
              </Link>
              
              <button
                onClick={onLogout}
                className="w-full group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
              >
                <LogOut className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;