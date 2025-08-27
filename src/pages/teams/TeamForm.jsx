import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../../components/ui/dialog';
import { Loader2 } from 'lucide-react';

const TeamForm = ({ team, onSubmit, isLoading }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: team || { reference: '', nom: '' },
  });

  const isEditing = !!team;

  useEffect(() => {
    reset(team || { reference: '', nom: '' });
  }, [team, reset]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{isEditing ? 'Modifier l\'équipe' : 'Ajouter une nouvelle équipe'}</DialogTitle>
        <DialogDescription>
          {isEditing ? 'Mettez à jour les informations de l équipe.' : 'Remplissez les informations pour créer une nouvelle équipe.'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reference">Référence</Label>
            <Input
              id="reference"
              {...register('reference', { required: 'La référence est obligatoire' })}
              placeholder="Ex: ELEC, MEC"
              className={errors.reference ? 'border-red-500' : ''}
            />
            {errors.reference && <p className="text-sm text-red-600">{errors.reference.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="nom">Nom de l'équipe</Label>
            <Input
              id="nom"
              {...register('nom', { required: 'Le nom est obligatoire' })}
              placeholder="Ex: Électriciens, Mécaniciens"
              className={errors.nom ? 'border-red-500' : ''}
            />
            {errors.nom && <p className="text-sm text-red-600">{errors.nom.message}</p>}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Annuler</Button>
          </DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isEditing ? 'Sauvegarder' : 'Créer'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default TeamForm;