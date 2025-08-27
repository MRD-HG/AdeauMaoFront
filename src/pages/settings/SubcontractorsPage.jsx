import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Plus } from 'lucide-react';
import { useSubcontractorList, useCreateSubcontractor } from '../../hooks/useSubcontractors';
import SubcontractorTable from '../../components/subcontractors/SubcontractorTable';
import SubcontractorForm from '../../components/subcontractors/SubcontractorForm';
import { Dialog, DialogTrigger } from '../../components/ui/dialog';

const SubcontractorsPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading } = useSubcontractorList({});
  const createSubcontractorMutation = useCreateSubcontractor();
  const subcontractors = data?.items || [];

  const handleFormSubmit = (formData) => {
    createSubcontractorMutation.mutate(formData, {
        onSuccess: () => setDialogOpen(false)
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Sous-traitants</h1>
                <DialogTrigger asChild>
                    <Button><Plus className="mr-2 h-4 w-4" /> Ajouter un sous-traitant</Button>
                </DialogTrigger>
            </div>
            <Card>
                <CardHeader><CardTitle>Liste des sous-traitants</CardTitle></CardHeader>
                <CardContent>
                    <SubcontractorTable subcontractors={subcontractors} isLoading={isLoading} />
                </CardContent>
            </Card>
        </div>
        <SubcontractorForm onSubmit={handleFormSubmit} />
    </Dialog>
  );
};

export default SubcontractorsPage;