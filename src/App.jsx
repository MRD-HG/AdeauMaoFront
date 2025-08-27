import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';

// Layout components
import Layout from './components/layout/Layout';
import AuthLayout from './components/layout/AuthLayout';
import PlaceholderPage from './components/layout/PlaceholderPage'; // Import the placeholder

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
import PlanningPage from './pages/planning/PlanningPage';
import StatisticsPage from './pages/statistics/StatisticsPage';
import ReportsPage from './pages/reports/ReportsPage';
import BudgetsPage from './pages/budgets/BudgetsPage';
import CategoriesPage from './pages/settings/CategoriesPage';
import BreakdownCausesPage from './pages/settings/BreakdownCausesPage';
import MaintenancePlansPage from './pages/maintenance-plans/MaintenancePlansPage';
import TriggersPage from './pages/settings/TriggersPage';
import SubcontractorsPage from './pages/settings/SubcontractorsPage';
import WorkflowsPage from './pages/settings/WorkflowsPage';



// Protected Route component
import ProtectedRoute from './components/auth/ProtectedRoute';
import WorkCentersPage from './pages/settings/WorkCentersPage';
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
              <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />

              {/* Protected routes */}
              <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />

                {/* Equipment Management */}
                <Route path="equipment" element={<EquipmentListPage />} />
                <Route path="equipment/:id" element={<EquipmentDetailsPage />} />

                {/* Maintenance */}
                <Route path="work-orders" element={<WorkOrderListPage />} />
                <Route path="work-orders/:id" element={<WorkOrderDetailsPage />} />
                <Route path="intervention-requests" element={<InterventionRequestListPage />} />
                <Route path="intervention-requests/:id" element={<InterventionRequestDetailsPage />} />
                <Route path="planning" element={<PlanningPage />} />
                <Route path="maintenance-plans" element={<MaintenancePlansPage />} />
                {/* Management */}
                <Route path="employees" element={<EmployeeListPage />} />
                <Route path="teams" element={<TeamListPage />} />
                <Route path="budgets" element={<BudgetsPage />} />

                {/* Analysis */}
               <Route path="statistics" element={<StatisticsPage />} />
               <Route path="reports" element={<ReportsPage />} />
                <Route path="settings/categories" element={<CategoriesPage />} />
                <Route path="settings/breakdown-causes" element={<BreakdownCausesPage />} />
                <Route path="settings/work-centers" element={<WorkCentersPage />} />
                <Route path="settings/triggers" element={<TriggersPage />} />
                <Route path="settings/subcontractors" element={<SubcontractorsPage />} />
                <Route path="settings/workflows" element={<WorkflowsPage />} />
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