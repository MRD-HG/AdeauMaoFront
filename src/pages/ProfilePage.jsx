import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profil utilisateur</h1>
        <p className="text-gray-600 mt-1">
          Gérez vos informations personnelles et préférences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du profil</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Fonctionnalité en cours de développement...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;

