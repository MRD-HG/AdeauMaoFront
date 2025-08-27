import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';

const SubcontractorForm = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm();
    return (
        <DialogContent className="sm:max-w-lg">
            <DialogHeader><DialogTitle>Ajouter un Sous-traitant</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2"><Label>Référence</Label><Input {...register('reference')} /></div>
                    <div className="space-y-2"><Label>Nom</Label><Input {...register('nom')} /></div>
                    <div className="space-y-2"><Label>Téléphone</Label><Input {...register('telephone')} /></div>
                    <div className="space-y-2"><Label>Email</Label><Input type="email" {...register('email')} /></div>
                    <div className="space-y-2"><Label>Pays</Label><Input {...register('pays')} /></div>
                    <div className="space-y-2"><Label>Ville</Label><Input {...register('ville')} /></div>
                    <div className="col-span-2 space-y-2"><Label>Adresse</Label><Input {...register('adresse')} /></div>
                </div>
                <DialogFooter>
                    <Button type="submit">Ajouter</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default SubcontractorForm;