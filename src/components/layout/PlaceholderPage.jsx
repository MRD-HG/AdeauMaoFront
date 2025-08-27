import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const PlaceholderPage = ({ title, description, cardTitle, cardDescription }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{cardDescription}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;