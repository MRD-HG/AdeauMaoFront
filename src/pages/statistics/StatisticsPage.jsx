import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { mockKpiData } from '../../lib/mockData';

const StatisticsPage = () => {
  const { mttr, mtbf, equipmentAvailability } = mockKpiData;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Statistiques et KPIs</h1>
        <p className="text-muted-foreground">Analyse des performances de la maintenance.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {/* MTTR Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
                <CardHeader>
                    <CardTitle>Temps Moyen de Réparation (MTTR)</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mttr}>
                            <XAxis dataKey="month" />
                            <YAxis label={{ value: 'Heures', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" name="MTTR (heures)" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </motion.div>

        {/* MTBF Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
                <CardHeader>
                    <CardTitle>Temps Moyen Entre Pannes (MTBF)</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mtbf}>
                            <XAxis dataKey="month" />
                            <YAxis label={{ value: 'Heures', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#82ca9d" name="MTBF (heures)" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </motion.div>
        
        {/* Equipment Availability Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Taux de Disponibilité par Type d'Équipement</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={equipmentAvailability} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {equipmentAvailability.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StatisticsPage;