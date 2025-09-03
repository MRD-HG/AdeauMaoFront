import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const StatCard = ({ title, value, isLoading }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <Skeleton className="h-8 w-1/2" />
      ) : (
        <div className="text-2xl font-bold">{value}</div>
      )}
    </CardContent>
  </Card>
);

const EquipmentStats = ({ stats, isLoading }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Equipment" value={stats?.total || 0} isLoading={isLoading} />
      <StatCard title="Active" value={stats?.active || 0} isLoading={isLoading} />
      <StatCard title="In Maintenance" value={stats?.inMaintenance || 0} isLoading={isLoading} />
      <StatCard title="Critical" value={stats?.critical || 0} isLoading={isLoading} />
    </div>
  );
};

export default EquipmentStats;