import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Plus } from 'lucide-react';
import { useInterventionRequestList } from '../../hooks/useInterventionRequests';
import InterventionRequestTable from '../../components/intervention-requests/InterventionRequestTable';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogTrigger } from '../../components/ui/dialog';
import InterventionRequestForm from '../../components/intervention-requests/InterventionRequestForm';
// We'll need a create hook, let's add it to the hooks file next
// import { useCreateInterventionRequest } from '../../hooks/useInterventionRequests';

const InterventionRequestListPage = () => {
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [dialogOpen, setDialogOpen] = useState(false);

  // const createRequestMutation = useCreateInterventionRequest();
  
  const { data, isLoading, error } = useInterventionRequestList({
      statut: statusFilter === 'Tous' ? null : statusFilter
  });
  
  const requests = data?.items || [];

  const handleFormSubmit = (formData) => {
    console.log("New Intervention Request:", formData);
    // createRequestMutation.mutate(formData, {
    //   onSuccess: () => setDialogOpen(false)
    // });
    alert("La fonctionnalité de création sera bientôt connectée à l'API.");
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Demandes d'intervention</h1>
            <p className="text-muted-foreground">Gérez les demandes de maintenance urgentes et planifiez les interventions.</p>
          </div>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Nouvelle DI</Button>
          </DialogTrigger>
        </motion.div>

        <Card>
          <CardHeader><CardTitle>Liste des demandes</CardTitle></CardHeader>
          <CardContent>
              <Tabs defaultValue="Tous" onValueChange={setStatusFilter}>
                  <TabsList className="mb-4">
                      <TabsTrigger value="Tous">Toutes</TabsTrigger>
                      <TabsTrigger value="Nouvelle">Nouvelles</TabsTrigger>
                      <TabsTrigger value="EnCours">En cours</TabsTrigger>
                      <TabsTrigger value="Terminee">Terminées</TabsTrigger>
                  </TabsList>
                  {error ? (
                      <p className="text-red-500 text-center py-8">Erreur de chargement des données.</p>
                  ) : (
                      <InterventionRequestTable requests={requests} isLoading={isLoading} />
                  )}
              </Tabs>
          </CardContent>
        </Card>
      </div>
      <InterventionRequestForm 
        onSubmit={handleFormSubmit}
        // isLoading={createRequestMutation.isPending}
      />
    </Dialog>
  );
};

export default InterventionRequestListPage;