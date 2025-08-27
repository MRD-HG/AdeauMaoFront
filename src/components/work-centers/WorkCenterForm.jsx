import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';

const WorkCenterForm = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm();
    return (
        <DialogContent>
            <DialogHeader><DialogTitle>Ajouter un Poste de Travail</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-4">
                    <div className="space-y-2">
                        <Label>Désignation</Label>
                        <Input {...register('designation')} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Ajouter</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default WorkCenterForm;