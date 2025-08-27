import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Plus, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWorkOrderList } from '../../hooks/useWorkOrders';
import WorkOrderTable from './WorkOrderTable';
import { Input } from '../../components/ui/input';
import { Search } from 'lucide-react';

const WorkOrderListPage = () => {
  const [filters, setFilters] = useState({ 
      etat: 'Tous',
      searchTerm: '' 
  });

  const { data, isLoading, error } = useWorkOrderList({ 
    ...filters,
    etat: filters.etat === 'Tous' ? null : filters.etat 
  });
  
  const handleTabChange = (value) => {
      setFilters(prev => ({ ...prev, etat: value }));
  }

  const handleSearchChange = (event) => {
      setFilters(prev => ({...prev, searchTerm: event.target.value}));
  }

  const workOrders = data?.items || [];
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Ordres de travail</h1>
          <p className="text-muted-foreground">Suivez et gérez toutes les tâches de maintenance.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Imprimer</Button>
            <Button>
                <Plus className="mr-2 h-4 w-4" /> Nouvel OT
            </Button>
        </div>
      </motion.div>
      
      <Card>
        <CardHeader>
             <div className="flex justify-between items-center">
                <CardTitle>Liste des OT</CardTitle>
                <div className="w-full max-w-sm relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Rechercher par N°, équipement..." 
                        className="pl-9"
                        value={filters.searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="Tous" onValueChange={handleTabChange}>
                <TabsList className="mb-4">
                  <TabsTrigger value="Tous">Tous</TabsTrigger>
                  <TabsTrigger value="EnCours">En cours</TabsTrigger>
                  <TabsTrigger value="AFaire">À Faire</TabsTrigger>
                  <TabsTrigger value="Termine">Terminé</TabsTrigger>
                </TabsList>
                
                {error ? (
                    <p className="text-red-500 text-center py-8">Erreur de chargement des données.</p>
                ) : (
                    <WorkOrderTable workOrders={workOrders} isLoading={isLoading} />
                )}
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkOrderListPage;