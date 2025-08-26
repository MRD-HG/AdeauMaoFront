import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const InterventionRequestDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Détails de la demande d'intervention</h1>
        <p className="text-gray-600 mt-1">
          Demande ID: {id}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de la demande</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Fonctionnalité en cours de développement...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterventionRequestDetailsPage;

