import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const WorkOrderListPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ordres de travail</h1>
        <p className="text-gray-600 mt-1">
          Gestion des ordres de travail de maintenance
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des ordres de travail</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Fonctionnalité en cours de développement...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkOrderListPage;

