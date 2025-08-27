import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Loader2 } from 'lucide-react';

const EquipmentForm = ({ equipment, onSubmit, isLoading }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const isEditing = !!equipment;

  useEffect(() => {
    if (isEditing) {
      reset(equipment);
    } else {
      reset({
        reference: '',
        nom: '',
        categorie: '',
        marque: '',
        modele: '',
        etat: 'En service',
        criticite: 'Moyenne criticité',
        prixAchat: 0,
      });
    }
  }, [equipment, reset, isEditing]);

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>{isEditing ? 'Modifier l\'équipement' : 'Ajouter un nouvel équipement'}</DialogTitle>
        <DialogDescription>
          Remplissez les détails de l'équipement ci-dessous.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {/* Form Fields */}
          <div className="space-y-2">
            <Label htmlFor="reference">Référence</Label>
            <Input id="reference" {...register('reference', { required: true })} />
            {errors.reference && <p className="text-sm text-red-600">Ce champ est requis.</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="nom">Nom de l'équipement</Label>
            <Input id="nom" {...register('nom', { required: true })} />
            {errors.nom && <p className="text-sm text-red-600">Ce champ est requis.</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="categorie">Catégorie</Label>
            <Input id="categorie" {...register('categorie')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="marque">Marque</Label>
            <Input id="marque" {...register('marque')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modele">Modèle</Label>
            <Input id="modele" {...register('modele')} />
          </div>
           <div className="space-y-2">
            <Label htmlFor="prixAchat">Prix d'achat</Label>
            <Input id="prixAchat" type="number" {...register('prixAchat', { valueAsNumber: true })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="etat">État</Label>
            <Select onValueChange={(value) => setValue('etat', value)} defaultValue={equipment?.etat}>
              <SelectTrigger><SelectValue placeholder="Sélectionnez un état" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="En service">En service</SelectItem>
                <SelectItem value="En maintenance">En maintenance</SelectItem>
                <SelectItem value="Hors service">Hors service</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="criticite">Criticité</Label>
            <Select onValueChange={(value) => setValue('criticite', value)} defaultValue={equipment?.criticite}>
              <SelectTrigger><SelectValue placeholder="Sélectionnez une criticité" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Haute criticité">Haute criticité</SelectItem>
                <SelectItem value="Moyenne criticité">Moyenne criticité</SelectItem>
                <SelectItem value="Faible criticité">Faible criticité</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Annuler</Button>
          </DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isEditing ? 'Sauvegarder les modifications' : 'Créer l\'équipement'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EquipmentForm;