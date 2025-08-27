import {React, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Plus } from 'lucide-react';
import { useWorkCenterList, useCreateWorkCenter } from '../../hooks/useWorkCenters';
import WorkCenterTable from '../../components/work-centers/WorkCenterTable';
import WorkCenterForm from '../../components/work-centers/WorkCenterForm';
import { Dialog, DialogTrigger } from '../../components/ui/dialog';

const WorkCentersPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading } = useWorkCenterList({});
  const createWorkCenterMutation = useCreateWorkCenter();
  const centers = data?.items || [];

  const handleFormSubmit = (formData) => {
    createWorkCenterMutation.mutate(formData, {
        onSuccess: () => setDialogOpen(false)
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Postes de Travail</h1>
                <DialogTrigger asChild>
                    <Button><Plus className="mr-2 h-4 w-4" /> Ajouter un poste de travail</Button>
                </DialogTrigger>
            </div>
            <Card>
                <CardHeader><CardTitle>Liste des postes de travail</CardTitle></CardHeader>
                <CardContent>
                    <WorkCenterTable centers={centers} isLoading={isLoading} />
                </CardContent>
            </Card>
        </div>
        <WorkCenterForm onSubmit={handleFormSubmit} />
    </Dialog>
  );
};

export default WorkCentersPage;