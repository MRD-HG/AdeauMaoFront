import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';

// Layout components
import Layout from './components/layout/Layout';
import AuthLayout from './components/layout/AuthLayout';

// Page components
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EquipmentListPage from './pages/equipment/EquipmentListPage';
import EquipmentDetailsPage from './pages/equipment/EquipmentDetailsPage';
import WorkOrderListPage from './pages/work-orders/WorkOrderListPage';
import WorkOrderDetailsPage from './pages/work-orders/WorkOrderDetailsPage';
import InterventionRequestListPage from './pages/intervention-requests/InterventionRequestListPage';
import InterventionRequestDetailsPage from './pages/intervention-requests/InterventionRequestDetailsPage';
import EmployeeListPage from './pages/employees/EmployeeListPage';
import TeamListPage from './pages/teams/TeamListPage';
import ProfilePage from './pages/ProfilePage';

// Protected Route component
import ProtectedRoute from './components/auth/ProtectedRoute';

import './App.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={
                <AuthLayout>
                  <LoginPage />
                </AuthLayout>
              } />

              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                {/* Dashboard */}
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />

                {/* Equipment Management */}
                <Route path="equipment" element={<EquipmentListPage />} />
                <Route path="equipment/:id" element={<EquipmentDetailsPage />} />

                {/* Work Orders */}
                <Route path="work-orders" element={<WorkOrderListPage />} />
                <Route path="work-orders/:id" element={<WorkOrderDetailsPage />} />

                {/* Intervention Requests */}
                <Route path="intervention-requests" element={<InterventionRequestListPage />} />
                <Route path="intervention-requests/:id" element={<InterventionRequestDetailsPage />} />

                {/* Team Management */}
                <Route path="employees" element={<EmployeeListPage />} />
                <Route path="teams" element={<TeamListPage />} />

                {/* Profile */}
                <Route path="profile" element={<ProfilePage />} />
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>

            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
