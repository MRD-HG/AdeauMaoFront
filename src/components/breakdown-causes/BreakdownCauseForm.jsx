import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';

const BreakdownCauseForm = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm();
    return (
        <DialogContent>
            <DialogHeader><DialogTitle>Ajouter une Cause de Panne</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2"><Label>Référence</Label><Input {...register('reference')} /></div>
                    <div className="space-y-2"><Label>Libellé</Label><Input {...register('libelle')} /></div>
                </div>
                <DialogFooter>
                    <Button type="submit">Ajouter</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default BreakdownCauseForm;