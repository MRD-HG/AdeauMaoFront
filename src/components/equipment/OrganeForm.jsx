import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '../ui/dialog';
import { Loader2 } from 'lucide-react';

const OrganeForm = ({ onSubmit, isLoading }) => {
    const { register, handleSubmit } = useForm();
    return (
        <DialogContent>
            <DialogHeader><DialogTitle>Ajouter un Organe</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Nom de l'Organe</Label>
                        <Input {...register('nomOrgane', { required: true })} />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea {...register('description')} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Annuler</Button></DialogClose>
                    <Button type="submit" disabled={isLoading}>{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Ajouter</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default OrganeForm;