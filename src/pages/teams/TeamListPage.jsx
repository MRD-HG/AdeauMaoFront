import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const TeamListPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Équipes</h1>
        <p className="text-gray-600 mt-1">
          Gestion des équipes de maintenance
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des équipes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Fonctionnalité en cours de développement...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamListPage;

