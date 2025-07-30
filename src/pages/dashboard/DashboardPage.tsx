import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PatientDashboard from './PatientDashboard';
import HospitalDashboard from './HospitalDashboard';
import AdminDashboard from './AdminDashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'patient':
        return <PatientDashboard />;
      case 'hospital':
        return <HospitalDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Welcome to BloodFlow Nexus</h2>
            <p className="text-muted-foreground">
              Your dashboard will appear here once your account is properly configured.
            </p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
}