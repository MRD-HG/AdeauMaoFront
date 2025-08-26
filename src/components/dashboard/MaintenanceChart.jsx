import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { motion } from 'framer-motion';

// Sample data for maintenance analytics
const maintenanceData = [
  { month: 'Jan', preventive: 12, corrective: 8, total: 20 },
  { month: 'Fév', preventive: 15, corrective: 6, total: 21 },
  { month: 'Mar', preventive: 18, corrective: 9, total: 27 },
  { month: 'Avr', preventive: 14, corrective: 7, total: 21 },
  { month: 'Mai', preventive: 16, corrective: 5, total: 21 },
  { month: 'Jun', preventive: 20, corrective: 8, total: 28 },
];

const equipmentStatusData = [
  { name: 'En service', value: 156, color: '#10b981' },
  { name: 'En maintenance', value: 23, color: '#f59e0b' },
  { name: 'Hors service', value: 8, color: '#ef4444' },
  { name: 'En attente', value: 12, color: '#6b7280' },
];

const costData = [
  { month: 'Jan', cost: 15000 },
  { month: 'Fév', cost: 18000 },
  { month: 'Mar', cost: 22000 },
  { month: 'Avr', cost: 16000 },
  { month: 'Mai', cost: 19000 },
  { month: 'Jun', cost: 25000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MaintenanceChart = ({ type = 'bar', title, description }) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="preventive" 
                fill="#3b82f6" 
                name="Préventive"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="corrective" 
                fill="#ef4444" 
                name="Corrective"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={equipmentStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {equipmentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [value, name]}
                labelFormatter={() => ''}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => `${value / 1000}k€`}
              />
              <Tooltip 
                formatter={(value) => [`${value.toLocaleString()}€`, 'Coût']}
                labelFormatter={(label) => `Mois: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="cost" 
                stroke="#8b5cf6" 
                fill="#8b5cf6"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={maintenanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  const getLegend = () => {
    if (type === 'pie') {
      return (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {equipmentStatusData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">
                {item.name} ({item.value})
              </span>
            </div>
          ))}
        </div>
      );
    }
    
    if (type === 'bar') {
      return (
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-blue-500" />
            <span className="text-sm text-gray-600">Maintenance Préventive</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span className="text-sm text-gray-600">Maintenance Corrective</span>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {renderChart()}
            {getLegend()}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MaintenanceChart;

