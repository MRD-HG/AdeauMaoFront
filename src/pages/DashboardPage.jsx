import React from 'react';
import { Button } from '../components/ui/button';
import { 
  Wrench, 
  ClipboardList, 
  AlertTriangle, 
  CheckCircle, 
  Plus,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StatsCard from '../components/dashboard/StatsCard';
import MaintenanceChart from '../components/dashboard/MaintenanceChart';
import RecentActivity from '../components/dashboard/RecentActivity';

const DashboardPage = () => {
  // Mock data - will be replaced with real API calls
  const stats = [
    {
      title: 'Équipements',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: Wrench,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Ordres de travail',
      value: '23',
      change: '+5%',
      trend: 'up',
      icon: ClipboardList,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Demandes urgentes',
      value: '8',
      change: '-15%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Tâches terminées',
      value: '45',
      change: '+8%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">
            Vue d'ensemble de votre système de maintenance
          </p>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link to="/work-orders/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouvel OT
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/intervention-requests/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle demande
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            {...stat}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance Trends */}
        <MaintenanceChart
          type="bar"
          title="Tendances de maintenance"
          description="Évolution des maintenances préventives et correctives"
        />

        {/* Equipment Status Distribution */}
        <MaintenanceChart
          type="pie"
          title="Répartition des équipements"
          description="État opérationnel des équipements"
        />
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Analysis */}
        <MaintenanceChart
          type="area"
          title="Analyse des coûts"
          description="Évolution des coûts de maintenance"
        />

        {/* Recent Activity */}
        <RecentActivity limit={5} />
      </div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* MTBF Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-blue-700 bg-blue-200 px-2 py-1 rounded-full">
              +5.2%
            </span>
          </div>
          <h3 className="text-lg font-semibold text-blue-900 mb-1">MTBF Moyen</h3>
          <p className="text-3xl font-bold text-blue-900 mb-2">847h</p>
          <p className="text-sm text-blue-700">Temps moyen entre pannes</p>
        </div>

        {/* MTTR Card */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-green-700 bg-green-200 px-2 py-1 rounded-full">
              -12%
            </span>
          </div>
          <h3 className="text-lg font-semibold text-green-900 mb-1">MTTR Moyen</h3>
          <p className="text-3xl font-bold text-green-900 mb-2">4.2h</p>
          <p className="text-sm text-green-700">Temps moyen de réparation</p>
        </div>

        {/* Availability Card */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-purple-700 bg-purple-200 px-2 py-1 rounded-full">
              +2.1%
            </span>
          </div>
          <h3 className="text-lg font-semibold text-purple-900 mb-1">Disponibilité</h3>
          <p className="text-3xl font-bold text-purple-900 mb-2">94.8%</p>
          <p className="text-sm text-purple-700">Taux de disponibilité global</p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
            <Link to="/equipment/new">
              <Wrench className="h-6 w-6 text-blue-600" />
              <span className="text-sm">Ajouter équipement</span>
            </Link>
          </Button>
          
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
            <Link to="/work-orders/new">
              <ClipboardList className="h-6 w-6 text-green-600" />
              <span className="text-sm">Créer OT</span>
            </Link>
          </Button>
          
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
            <Link to="/intervention-requests">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              <span className="text-sm">Demandes urgentes</span>
            </Link>
          </Button>
          
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
            <Link to="/reports">
              <BarChart3 className="h-6 w-6 text-purple-600" />
              <span className="text-sm">Rapports</span>
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;

