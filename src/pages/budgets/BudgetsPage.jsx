import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Plus } from 'lucide-react';
import { useBudgetList, useCreateBudget } from '../../hooks/useBudgets';
import BudgetTable from '../../components/budgets/BudgetsTable';
import BudgetForm from '../../components/budgets/BudgetsForm';
import { Dialog, DialogTrigger } from '../../components/ui/dialog';
import { motion } from 'framer-motion';

const BudgetsPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading, error } = useBudgetList({});
  const createBudgetMutation = useCreateBudget();
  
  const budgets = data?.items || [];

  const handleFormSubmit = (formData) => {
    createBudgetMutation.mutate(formData, {
        onSuccess: () => setDialogOpen(false),
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
                <div>
                <h1 className="text-3xl font-bold">Budgets de Maintenance</h1>
                <p className="text-muted-foreground">Suivez les coûts prévisionnels et réels.</p>
                </div>
                <DialogTrigger asChild>
                    <Button><Plus className="mr-2 h-4 w-4" /> Ajouter un budget</Button>
                </DialogTrigger>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card>
                    <CardHeader><CardTitle>Suivi Annuel</CardTitle></CardHeader>
                    <CardContent>
                    {error ? (
                        <p className="text-red-500 text-center py-8">Erreur de chargement des données.</p>
                    ) : (
                        <BudgetTable budgets={budgets} isLoading={isLoading} />
                    )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
        <BudgetForm 
            onSubmit={handleFormSubmit}
            isLoading={createBudgetMutation.isPending}
        />
    </Dialog>
  );
};

export default BudgetsPage;