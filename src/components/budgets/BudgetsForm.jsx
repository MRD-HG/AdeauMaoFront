import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '../ui/dialog';
import { Loader2 } from 'lucide-react';

const BudgetForm = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit } = useForm();
  
  return (
    <DialogContent>
      <DialogHeader><DialogTitle>Ajouter un Budget</DialogTitle></DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2"><Label>Année</Label><Input type="number" defaultValue={new Date().getFullYear()} {...register('annee', { valueAsNumber: true })} /></div>
          <div className="space-y-2"><Label>Mois</Label><Input {...register('mois')} /></div>
          <div className="space-y-2"><Label>Budget Prévisionnel</Label><Input type="number" {...register('budgetPrevisionnel', { valueAsNumber: true })} /></div>
          <div className="space-y-2"><Label>Budget Réel</Label><Input type="number" {...register('budgetReel', { valueAsNumber: true })} /></div>
        </div>
        <DialogFooter>
          <DialogClose asChild><Button type="button" variant="outline">Annuler</Button></DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Ajouter
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default BudgetForm;