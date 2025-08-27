import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowUpRight, Wrench, AlertTriangle, Users, ClipboardList, Wallet, BarChart3, Calendar, FileText } from 'lucide-react';
import { useDashboardStats } from '../hooks/useDashboard';
import { motion } from 'framer-motion';
import { Skeleton } from '../components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { formatDate } from '../lib/utils';

// Un composant réutilisable pour nos cartes de tableau de bord
const DashboardCard = ({ title, value, icon: Icon, to, isLoading, color, description }) => (
  <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
    <Link to={to}>
      <Card className="hover:border-primary/80 hover:shadow-lg transition-all duration-300 h-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex flex-col space-y-1.5">
              <CardTitle className="text-lg">{title}</CardTitle>
              {description && <CardDescription className="text-xs">{description}</CardDescription>}
            </div>
            <div className={`p-3 rounded-lg bg-opacity-20 ${color}`}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-10 w-1/2 mt-2" />
          ) : (
            <p className="text-4xl font-bold">{value}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);

const DashboardPage = () => {
    const { data: stats, isLoading } = useDashboardStats();

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.08,
                duration: 0.4,
                ease: "easeOut"
            }
        })
    };

    const cards = [
        { title: "Équipements", value: stats?.equipmentCount, to: "/equipment", icon: Wrench, color: "bg-blue-200 text-blue-800", description: "Total des actifs" },
        { title: "Ordres de Travail", value: stats?.activeWorkOrders, to: "/work-orders", icon: ClipboardList, color: "bg-orange-200 text-orange-800", description: "Actifs ce mois-ci" },
        { title: "Demandes", value: stats?.newInterventionRequests, to: "/intervention-requests", icon: AlertTriangle, color: "bg-red-200 text-red-800", description: "Nouvelles demandes" },
        { title: "Calendrier", value: "Voir", to: "/planning", icon: Calendar, color: "bg-green-200 text-green-800", description: "Planification" },
        { title: "Équipes", value: stats?.teamCount, to: "/teams", icon: Users, color: "bg-indigo-200 text-indigo-800", description: "Équipes actives" },
        { title: "Statistiques", value: "KPIs", to: "/statistics", icon: BarChart3, color: "bg-purple-200 text-purple-800", description: "Performances" },
        { title: "Rapports", value: "Générer", to: "/reports", icon: FileText, color: "bg-gray-200 text-gray-800", description: "Exporter des données" },
        { title: "Budgets", value: "Suivi", to: "/budgets", icon: Wallet, color: "bg-teal-200 text-teal-800", description: "Gestion des coûts" },
    ];

    return (
        <div className="space-y-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-4xl font-bold tracking-tight">Tableau de bord</h1>
                <p className="text-muted-foreground mt-2">Bienvenue sur votre espace de gestion de maintenance.</p>
            </motion.div>

            {/* Grille des cartes de navigation */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((card, i) => (
                    <motion.div key={card.title} custom={i} variants={cardVariants} initial="hidden" animate="visible">
                       <DashboardCard {...card} isLoading={isLoading} />
                    </motion.div>
                ))}
            </div>

            {/* Liste des interventions récentes */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                    <CardHeader>
                        <CardTitle>Interventions Actuelles et Récentes</CardTitle>
                        <CardDescription>Aperçu des derniers ordres de travail créés.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       {/* Table content here... */}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default DashboardPage;