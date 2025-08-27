import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Plus } from 'lucide-react';
import { useBreakdownCauseList, useCreateBreakdownCause } from '../../hooks/useBreakdownCauses';
import BreakdownCauseTable from '../../components/breakdown-causes/BreakdownCauseTable';
import BreakdownCauseForm from '../../components/breakdown-causes/BreakdownCauseForm';
import { Dialog, DialogTrigger } from '../../components/ui/dialog';

const BreakdownCausesPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading } = useBreakdownCauseList({});
  const createBreakdownCauseMutation = useCreateBreakdownCause();
  const causes = data?.items || [];

  const handleFormSubmit = (formData) => {
    createBreakdownCauseMutation.mutate(formData, {
        onSuccess: () => setDialogOpen(false)
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Causes de Panne</h1>
                <DialogTrigger asChild>
                    <Button><Plus className="mr-2 h-4 w-4" /> Ajouter une cause</Button>
                </DialogTrigger>
            </div>
            <Card>
                <CardHeader><CardTitle>Liste des causes de panne</CardTitle></CardHeader>
                <CardContent>
                    <BreakdownCauseTable causes={causes} isLoading={isLoading} />
                </CardContent>
            </Card>
        </div>
        <BreakdownCauseForm onSubmit={handleFormSubmit} />
    </Dialog>
  );
};

export default BreakdownCausesPage;