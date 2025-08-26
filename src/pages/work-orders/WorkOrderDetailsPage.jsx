import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const WorkOrderDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Détails de l'ordre de travail</h1>
        <p className="text-gray-600 mt-1">
          Ordre de travail ID: {id}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de l'ordre de travail</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Fonctionnalité en cours de développement...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkOrderDetailsPage;

