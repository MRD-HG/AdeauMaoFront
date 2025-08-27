import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Plus } from 'lucide-react';
import { useEmployeeList } from '../../hooks/useEmployees';
import EmployeeTable from '../../components/employees/EmployeeTable';
import { motion } from 'framer-motion';

const EmployeeListPage = () => {
  const { data, isLoading, error } = useEmployeeList({});
  const employees = data?.items || [];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Employés</h1>
          <p className="text-muted-foreground">Gérez les informations de vos équipes de maintenance.</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" /> Nouvel employé</Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader><CardTitle>Liste du personnel</CardTitle></CardHeader>
          <CardContent>
            {error ? (
              <p className="text-red-500 text-center py-8">Erreur de chargement des données.</p>
            ) : (
              <EmployeeTable employees={employees} isLoading={isLoading} />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EmployeeListPage;