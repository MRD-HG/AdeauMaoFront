import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const InterventionRequestListPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Demandes d'intervention</h1>
        <p className="text-gray-600 mt-1">
          Gestion des demandes d'intervention
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des demandes d'intervention</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Fonctionnalité en cours de développement...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterventionRequestListPage;

