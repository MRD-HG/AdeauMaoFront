import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import EquipmentSelectionStep from './EquipmentSelectionStep'; // L'IMPORTATION QUI MANQUAIT

const MaintenancePlanForm = ({ onSubmit, isLoading }) => {
    const { register, handleSubmit, control } = useForm();
    const [step, setStep] = useState(1);
    const [tasks, setTasks] = useState([{ description: '' }]);
    const [selectedEquipments, setSelectedEquipments] = useState([]);

    const handleAddTask = () => setTasks([...tasks, { description: '' }]);
    const handleRemoveTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const onFinalSubmit = (data) => {
        const finalData = { ...data, tasks, equipments: selectedEquipments };
        onSubmit(finalData);
    };

    return (
        <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
                <DialogTitle>Créer un Nouveau Plan de Maintenance</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onFinalSubmit)}>
                <div className="py-4 min-h-[350px]">
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <div className="space-y-2"><Label>Nom du Plan</Label><Input {...register('nom', { required: true })} placeholder="Ex: Contrôle hebdomadaire des compresseurs" /></div>
                            <div className="space-y-2"><Label>Fréquence</Label>
                                <Select onValueChange={(val) => control.setValue('frequence', val)} defaultValue="Hebdomadaire">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Quotidien">Quotidien</SelectItem>
                                        <SelectItem value="Hebdomadaire">Hebdomadaire</SelectItem>
                                        <SelectItem value="Mensuel">Mensuel</SelectItem>
                                        <SelectItem value="Trimestriel">Trimestriel</SelectItem>
                                        <SelectItem value="Annuel">Annuel</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </motion.div>
                    )}
                    {step === 2 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <Label>Tâches à réaliser</Label>
                            {tasks.map((task, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input placeholder={`Tâche #${index + 1}`} defaultValue={task.description} onChange={(e) => {
                                        const newTasks = [...tasks];
                                        newTasks[index].description = e.target.value;
                                        setTasks(newTasks);
                                    }} />
                                    <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveTask(index)}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={handleAddTask}><Plus className="mr-2 h-4 w-4" />Ajouter une tâche</Button>
                        </motion.div>
                    )}
                    {step === 3 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Label className="mb-2 block">Équipements Concernés</Label>
                            <EquipmentSelectionStep 
                                selectedEquipments={selectedEquipments}
                                onSelectionChange={setSelectedEquipments}
                            />
                        </motion.div>
                    )}
                </div>
                <DialogFooter className="flex justify-between w-full">
                    <div>
                        {step > 1 && <Button type="button" variant="outline" onClick={prevStep}>Précédent</Button>}
                    </div>
                    <div>
                        {step < 3 && <Button type="button" onClick={nextStep}>Suivant</Button>}
                        {step === 3 && 
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Créer le Plan
                            </Button>
                        }
                    </div>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default MaintenancePlanForm;