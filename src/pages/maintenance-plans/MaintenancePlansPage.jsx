import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import MaintenancePlanTable from '../../components/maintenance-plans/MaintenancePlanTable';
import MaintenancePlanForm from '../../components/maintenance-plans/MaintenancePlanForm';
import { Dialog, DialogTrigger } from '../../components/ui/dialog';

const mockPlans = [
    { id: 1, nom: "Contrôle hebdomadaire des compresseurs", frequence: "Hebdomadaire", equipements: 2, taches: 3, actif: true },
    { id: 2, nom: "Graissage mensuel des pompes", frequence: "Mensuel", equipements: 4, taches: 2, actif: true },
    { id: 3, nom: "Inspection annuelle des moteurs", frequence: "Annuel", equipements: 12, taches: 8, actif: false },
];

const MaintenancePlansPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFormSubmit = (data) => {
      console.log("Nouveau plan de maintenance créé:", data);
      // Ici, vous appelleriez la mutation pour créer le plan
      alert("Plan créé avec succès (simulation) !");
      setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
            <div>
            <h1 className="text-3xl font-bold">Plans de Maintenance Préventive</h1>
            <p className="text-muted-foreground">Définissez des tâches récurrentes pour automatiser la création des OT.</p>
            </div>
            <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Nouveau Plan</Button>
            </DialogTrigger>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
            <CardHeader><CardTitle>Liste des Plans de Maintenance</CardTitle></CardHeader>
            <CardContent>
                <MaintenancePlanTable plans={mockPlans} />
            </CardContent>
            </Card>
        </motion.div>
        </div>
        <MaintenancePlanForm onSubmit={handleFormSubmit} />
    </Dialog>
  );
};

export default MaintenancePlansPage;