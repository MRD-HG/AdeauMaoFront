import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  Clock, 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  User,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatDate, getStatusColor } from '../../lib/utils';

// Mock recent activities data
const recentActivities = [
  {
    id: 1,
    type: 'work_order_completed',
    title: 'OT-2024-003 terminé',
    description: 'Remplacement du moteur défaillant - Ventilateur Industriel',
    user: 'Fatima Zahra',
    timestamp: '2024-01-23T16:30:00Z',
    status: 'Terminé',
    priority: 'Moyenne',
    icon: CheckCircle,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 2,
    type: 'intervention_request',
    title: 'Nouvelle demande d\'intervention',
    description: 'Niveau d\'huile bas - Compresseur Principal Atlas Copco',
    user: 'Karim Benjelloun',
    timestamp: '2024-01-25T14:15:00Z',
    status: 'Nouvelle',
    priority: 'Moyenne',
    icon: AlertTriangle,
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    id: 3,
    type: 'work_order_started',
    title: 'OT-2024-001 en cours',
    description: 'Maintenance préventive trimestrielle - Compresseur Principal',
    user: 'Ahmed Alami',
    timestamp: '2024-01-25T08:15:00Z',
    status: 'EnCours',
    priority: 'Moyenne',
    icon: Wrench,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 4,
    type: 'work_order_created',
    title: 'OT-2024-002 créé',
    description: 'Réparation fuite joint d\'étanchéité - Pompe Centrifuge',
    user: 'Hassan Bennani',
    timestamp: '2024-01-24T14:30:00Z',
    status: 'AFaire',
    priority: 'Haute',
    icon: AlertTriangle,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    id: 5,
    type: 'equipment_maintenance',
    title: 'Équipement en maintenance',
    description: 'Pompe Centrifuge Grundfos - Maintenance programmée',
    user: 'Système',
    timestamp: '2024-01-24T09:00:00Z',
    status: 'En maintenance',
    priority: 'Faible',
    icon: Wrench,
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
];

const RecentActivity = ({ limit = 5 }) => {
  const activities = recentActivities.slice(0, limit);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - time) / (1000 * 60));
      return `Il y a ${diffInMinutes} min`;
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Il y a ${diffInDays}j`;
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Haute': 'bg-red-100 text-red-800',
      'Moyenne': 'bg-yellow-100 text-yellow-800',
      'Faible': 'bg-green-100 text-green-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Activités récentes</CardTitle>
            <CardDescription>
              Dernières actions et événements du système
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/activities">
              Voir tout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* Activity Icon */}
                <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                  <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(activity.priority)}>
                        {activity.priority}
                      </Badge>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{activity.user}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{getRelativeTime(activity.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Avatar */}
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {getInitials(activity.user)}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            ))}
          </div>

          {activities.length === 0 && (
            <div className="text-center py-8">
              <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune activité récente
              </h3>
              <p className="text-gray-500">
                Les activités récentes apparaîtront ici.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentActivity;

