import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import Donors from './pages/Donors/Donors';
import DonorForm from './pages/Donors/DonorForm';
import Inventory from './pages/Inventory/Inventory';
import InventoryForm from './pages/Inventory/InventoryForm';
import Requests from './pages/Requests/Requests';
import RequestForm from './pages/Requests/RequestForm';
import Drives from './pages/Drives/Drives';
import DriveForm from './pages/Drives/DriveForm';
import Notifications from './pages/Notifications/Notifications';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminUsers from './pages/Admin/AdminUsers';
import Reports from './pages/Reports/Reports';
import Utilities from './pages/Utilities/Utilities';
import Landing from './pages/Landing/Landing';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } 
        />

        {/* Donor Management */}
        <Route 
          path="/donors" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'hospital']}>
              <Layout>
                <Donors />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/donors/new" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'hospital']}>
              <Layout>
                <DonorForm />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/donors/:id/edit" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'hospital']}>
              <Layout>
                <DonorForm />
              </Layout>
            </ProtectedRoute>
          } 
        />

        {/* Blood Inventory */}
        <Route 
          path="/inventory" 
          element={
            <ProtectedRoute>
              <Layout>
                <Inventory />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/inventory/new" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'hospital']}>
              <Layout>
                <InventoryForm />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/inventory/:id/edit" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'hospital']}>
              <Layout>
                <InventoryForm />
              </Layout>
            </ProtectedRoute>
          } 
        />

        {/* Blood Requests */}
        <Route 
          path="/requests" 
          element={
            <ProtectedRoute>
              <Layout>
                <Requests />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/requests/new" 
          element={
            <ProtectedRoute allowedRoles={['patient', 'hospital']}>
              <Layout>
                <RequestForm />
              </Layout>
            </ProtectedRoute>
          } 
        />

        {/* Donation Drives */}
        <Route 
          path="/drives" 
          element={
            <ProtectedRoute>
              <Layout>
                <Drives />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/drives/new" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'hospital']}>
              <Layout>
                <DriveForm />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/drives/:id/edit" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'hospital']}>
              <Layout>
                <DriveForm />
              </Layout>
            </ProtectedRoute>
          } 
        />

        {/* Notifications */}
        <Route 
          path="/notifications" 
          element={
            <ProtectedRoute>
              <Layout>
                <Notifications />
              </Layout>
            </ProtectedRoute>
          } 
        />

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <AdminUsers />
              </Layout>
            </ProtectedRoute>
          } 
        />

        {/* Reports */}
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'hospital']}>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          } 
        />

        {/* Utilities */}
        <Route 
          path="/utilities" 
          element={
            <ProtectedRoute>
              <Layout>
                <Utilities />
              </Layout>
            </ProtectedRoute>
          } 
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;