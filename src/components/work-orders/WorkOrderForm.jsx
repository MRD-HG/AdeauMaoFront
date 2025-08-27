import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Loader2 } from 'lucide-react';

// In a real app, you would fetch this list from your API
const mockTechnicians = [
    { id: 1, nom: "Ahmed Alami" },
    { id: 2, nom: "Hassan Bennani" },
    { id: 3, nom: "Fatima Zahra" },
];

const mockEquipments = [
    { id: 1, nom: "Compresseur Principal Atlas Copco" },
    { id: 2, nom: "Pompe Centrifuge Grundfos" },
    { id: 4, nom: "Ventilateur Industriel Soler & Palau" },
]

const WorkOrderForm = ({ workOrder, onSubmit, isLoading }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const isEditing = !!workOrder;

  useEffect(() => {
    reset(workOrder || { priorite: 'Moyenne', typeMaintenance: 'Corrective' });
  }, [workOrder, reset]);

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>{isEditing ? 'Modifier l\'ordre de travail' : 'Créer un nouvel ordre de travail'}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="descriptionTache">Description de la tâche</Label>
            <Textarea id="descriptionTache" {...register('descriptionTache', { required: true })} />
          </div>

          <div className="space-y-2">
            <Label>Équipement</Label>
            <Select onValueChange={(value) => setValue('equipementId', value)} defaultValue={workOrder?.equipementId}>
                <SelectTrigger><SelectValue placeholder="Sélectionner un équipement..." /></SelectTrigger>
                <SelectContent>
                    {mockEquipments.map(eq => <SelectItem key={eq.id} value={eq.id}>{eq.nom}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Technicien Assigné</Label>
            <Select onValueChange={(value) => setValue('technicienNom', value)} defaultValue={workOrder?.technicienNom}>
                <SelectTrigger><SelectValue placeholder="Sélectionner un technicien..." /></SelectTrigger>
                <SelectContent>
                    {mockTechnicians.map(tech => <SelectItem key={tech.id} value={tech.nom}>{tech.nom}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Priorité</Label>
             <Select onValueChange={(value) => setValue('priorite', value)} defaultValue={workOrder?.priorite || 'Moyenne'}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="Haute">Haute</SelectItem>
                    <SelectItem value="Moyenne">Moyenne</SelectItem>
                    <SelectItem value="Faible">Faible</SelectItem>
                </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Type de Maintenance</Label>
             <Select onValueChange={(value) => setValue('typeMaintenance', value)} defaultValue={workOrder?.typeMaintenance || 'Corrective'}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="Corrective">Corrective</SelectItem>
                    <SelectItem value="Preventive">Préventive</SelectItem>
                    <SelectItem value="Ameliorative">Améliorative</SelectItem>
                </SelectContent>
            </Select>
          </div>

        </div>
        <DialogFooter>
          <DialogClose asChild><Button type="button" variant="outline">Annuler</Button></DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Sauvegarder' : 'Créer'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default WorkOrderForm;