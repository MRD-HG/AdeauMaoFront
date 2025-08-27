import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Plus } from 'lucide-react';
import { useTriggerList, useCreateTrigger } from '../../hooks/useTriggers';
import TriggerTable from '../../components/triggers/TriggerTable';
import TriggerForm from '../../components/triggers/TriggerForm';
import { Dialog, DialogTrigger } from '../../components/ui/dialog';

const TriggersPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading } = useTriggerList({});
  const createTriggerMutation = useCreateTrigger();
  const triggers = data?.items || [];

  const handleFormSubmit = (formData) => {
    createTriggerMutation.mutate(formData, {
        onSuccess: () => setDialogOpen(false)
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Déclencheurs</h1>
                <DialogTrigger asChild>
                    <Button><Plus className="mr-2 h-4 w-4" /> Ajouter un déclencheur</Button>
                </DialogTrigger>
            </div>
            <Card>
                <CardHeader><CardTitle>Liste des déclencheurs</CardTitle></CardHeader>
                <CardContent>
                    <TriggerTable triggers={triggers} isLoading={isLoading} />
                </CardContent>
            </Card>
        </div>
        <TriggerForm onSubmit={handleFormSubmit} />
    </Dialog>
  );
};

export default TriggersPage;