import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Home, 
  Users, 
  Droplets, 
  Calendar, 
  Bell, 
  Settings, 
  LogOut,
  Building,
  ShieldCheck,
  Activity,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    const commonItems = [
      { href: '/dashboard', icon: Home, label: 'Dashboard', badge: null },
      { href: '/profile', icon: Settings, label: 'Profile', badge: null },
    ];

    switch (user?.role) {
      case 'patient':
        return [
          ...commonItems,
          { href: '/drives', icon: Calendar, label: 'Donation Drives', badge: null },
          { href: '/requests/my', icon: Droplets, label: 'My Requests', badge: null },
          { href: '/notifications', icon: Bell, label: 'Notifications', badge: '3' },
        ];
      
      case 'hospital':
        return [
          ...commonItems,
          { href: '/inventory', icon: Droplets, label: 'Blood Inventory', badge: null },
          { href: '/requests', icon: FileText, label: 'Blood Requests', badge: '12' },
          { href: '/donors', icon: Users, label: 'Donors', badge: null },
          { href: '/drives/manage', icon: Calendar, label: 'Manage Drives', badge: null },
          { href: '/notifications', icon: Bell, label: 'Notifications', badge: '5' },
        ];
      
      case 'admin':
        return [
          ...commonItems,
          { href: '/admin/users', icon: Users, label: 'User Management', badge: null },
          { href: '/admin/hospitals', icon: Building, label: 'Hospital Verification', badge: '2' },
          { href: '/analytics', icon: Activity, label: 'Analytics', badge: null },
          { href: '/admin/settings', icon: ShieldCheck, label: 'System Settings', badge: null },
          { href: '/notifications', icon: Bell, label: 'Notifications', badge: '8' },
        ];
      
      default:
        return commonItems;
    }
  };

  const navigationItems = getNavigationItems();

  const isActiveRoute = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'patient': return 'bg-success';
      case 'hospital': return 'bg-info';
      case 'admin': return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'patient': return 'Patient/Donor';
      case 'hospital': return 'Hospital';
      case 'admin': return 'Administrator';
      default: return role;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border flex flex-col shadow-card">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">BloodFlow Nexus</h1>
              <p className="text-xs text-muted-foreground">Life Saving Platform</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className={`${getRoleColor(user?.role || '')} text-white text-xs`}>
                  {getRoleLabel(user?.role || '')}
                </Badge>
                {user?.verified && (
                  <ShieldCheck className="w-3 h-3 text-success" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(item.href);
              return (
                <Link key={item.href} to={item.href}>
                  <div className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-medical' 
                      : 'hover:bg-secondary text-foreground hover:text-foreground'
                    }
                  `}>
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge variant="destructive" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Emergency Button (for non-admin users) */}
        {user?.role !== 'admin' && (
          <div className="p-4 border-t border-border">
            <Button 
              variant="emergency" 
              className="w-full justify-start gap-3"
              size="sm"
            >
              <AlertTriangle className="w-4 h-4" />
              Emergency Request
            </Button>
          </div>
        )}

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button 
            variant="ghost" 
            onClick={logout}
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {location.pathname === '/dashboard' && `Welcome back, ${user?.name}`}
                {location.pathname === '/profile' && 'Profile Settings'}
                {location.pathname === '/inventory' && 'Blood Inventory'}
                {location.pathname === '/requests' && 'Blood Requests'}
                {location.pathname === '/donors' && 'Donor Management'}
                {location.pathname === '/drives' && 'Donation Drives'}
                {location.pathname === '/analytics' && 'Analytics Dashboard'}
                {location.pathname.includes('/admin') && 'Administration'}
              </h2>
              <p className="text-muted-foreground">
                {location.pathname === '/dashboard' && 'Manage your blood donation activities'}
                {location.pathname === '/profile' && 'Update your account information'}
                {location.pathname === '/inventory' && 'Monitor blood stock levels'}
                {location.pathname === '/requests' && 'Handle blood requests efficiently'}
                {location.pathname === '/donors' && 'Manage donor database'}
                {location.pathname === '/drives' && 'Organize donation events'}
                {location.pathname === '/analytics' && 'View system insights and reports'}
                {location.pathname.includes('/admin') && 'System administration tools'}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="text-right">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}