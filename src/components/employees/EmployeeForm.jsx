import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '../ui/dialog';
import { Loader2 } from 'lucide-react';

const EmployeeForm = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit } = useForm();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ajouter un nouvel employé</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="matricule">Matricule</Label>
            <Input id="matricule" {...register('matricule', { required: true })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="poste">Poste</Label>
            <Input id="poste" {...register('poste', { required: true })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nom">Nom</Label>
            <Input id="nom" {...register('nom', { required: true })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prenom">Prénom</Label>
            <Input id="prenom" {...register('prenom', { required: true })} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild><Button type="button" variant="outline">Annuler</Button></DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Créer l'employé
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EmployeeForm;