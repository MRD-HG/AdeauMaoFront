import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Plus, Printer, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWorkOrderList, useCreateWorkOrder, useUpdateWorkOrder } from '../../hooks/useWorkOrders';
import WorkOrderTable from './WorkOrderTable';
import WorkOrderForm from '../../components/work-orders/WorkOrderForm';
import { Dialog, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { mockEquipment } from '../../lib/mockData';

const WorkOrderListPage = () => {
  const [filters, setFilters] = useState({ etat: 'Tous', searchTerm: '' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null); // State to track the WO to edit

  const { data, isLoading, error } = useWorkOrderList({ 
    ...filters,
    etat: filters.etat === 'Tous' ? null : filters.etat 
  });
  const createWorkOrderMutation = useCreateWorkOrder();
  const updateWorkOrderMutation = useUpdateWorkOrder();
  
  const handleTabChange = (value) => setFilters(prev => ({ ...prev, etat: value }));
  const handleSearchChange = (event) => setFilters(prev => ({...prev, searchTerm: event.target.value}));

  // This function now handles BOTH creating and updating
  const handleFormSubmit = (formData) => {
    // If we have a selectedWorkOrder, we are editing
    if (selectedWorkOrder) {
      updateWorkOrderMutation.mutate({ id: selectedWorkOrder.id, data: formData }, {
        onSuccess: () => {
          setDialogOpen(false);
          setSelectedWorkOrder(null); // Clear selection after edit
        }
      });
    } else {
      // Otherwise, we are creating a new one
      const selectedEquipment = mockEquipment.find(eq => eq.id === formData.equipementId);
      const fullData = {
          ...formData,
          equipementNom: selectedEquipment?.nom || 'N/A',
          equipementReference: selectedEquipment?.reference || 'N/A'
      };
      createWorkOrderMutation.mutate(fullData, {
          onSuccess: () => setDialogOpen(false)
      });
    }
  };

  // Function to open the dialog for creating
  const openDialogForCreate = () => {
    setSelectedWorkOrder(null); // Ensure no WO is selected
    setDialogOpen(true);
  };

  // Function to open the dialog for editing
  const openDialogForEdit = (workOrder) => {
    setSelectedWorkOrder(workOrder); // Set the WO to be edited
    setDialogOpen(true);
  };

  const workOrders = data?.items || [];
  
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                    <DialogTrigger asChild>
                        {/* Use the specific create handler */}
                        <Button onClick={openDialogForCreate}><Plus className="mr-2 h-4 w-4" /> Nouvel OT</Button>
                    </DialogTrigger>
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
                            <p className="text-red-500 text-center py-8">Erreur de chargement des données. Vérifiez `api.js`.</p>
                        ) : (
                            <WorkOrderTable 
                                workOrders={workOrders} 
                                isLoading={isLoading}
                                onEdit={openDialogForEdit} // Pass the edit handler to the table
                            />
                        )}
                    </Tabs>
                </CardContent>
            </Card>
        </div>
        <WorkOrderForm 
            workOrder={selectedWorkOrder} // Pass the selected WO to the form
            onSubmit={handleFormSubmit}
            isLoading={createWorkOrderMutation.isPending || updateWorkOrderMutation.isPending}
        />
    </Dialog>
  );
};

export default WorkOrderListPage;