import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Loader2 } from 'lucide-react';
import { mockEquipment } from '../../lib/mockData'; // Assuming you have a list of equipment

const InterventionRequestForm = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, setValue } = useForm();

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Nouvelle Demande d'Intervention</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Équipement</Label>
            <Select onValueChange={(value) => setValue('equipementId', parseInt(value))}>
              <SelectTrigger><SelectValue placeholder="Sélectionner un équipement..." /></SelectTrigger>
              <SelectContent>
                {mockEquipment.map(eq => (
                  <SelectItem key={eq.id} value={String(eq.id)}>{eq.nom} ({eq.reference})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Priorité</Label>
            <Select onValueChange={(value) => setValue('priorite', value)} defaultValue="Moyenne">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Haute">Haute</SelectItem>
                <SelectItem value="Moyenne">Moyenne</SelectItem>
                <SelectItem value="Faible">Faible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descriptionProbleme">Description du problème</Label>
            <Textarea
              id="descriptionProbleme"
              {...register('descriptionProbleme', { required: true })}
              placeholder="Décrivez le problème observé..."
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild><Button type="button" variant="outline">Annuler</Button></DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Créer la demande
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default InterventionRequestForm;