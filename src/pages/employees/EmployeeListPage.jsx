import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Plus } from 'lucide-react';
import { useEmployeeList, useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from '../../hooks/useEmployees';
import EmployeeTable from '../../components/employees/EmployeeTable';
import EmployeeForm from '../../components/employees/EmployeeForm';
import { Dialog, DialogTrigger } from '../../components/ui/dialog';
import { DeleteConfirmationDialog } from '../../components/ui/confirmation-dialog';
import { motion } from 'framer-motion';

const EmployeeListPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { data, isLoading, error } = useEmployeeList({});
  const createEmployeeMutation = useCreateEmployee();
  const updateEmployeeMutation = useUpdateEmployee();
  const deleteEmployeeMutation = useDeleteEmployee();
  
  const employees = data?.items || [];

  const handleFormSubmit = (formData) => {
    if (selectedEmployee) {
      updateEmployeeMutation.mutate({ id: selectedEmployee.id, data: formData }, {
        onSuccess: () => setDialogOpen(false)
      });
    } else {
      createEmployeeMutation.mutate(formData, {
        onSuccess: () => setDialogOpen(false)
      });
    }
  };

  const openCreateDialog = () => {
    setSelectedEmployee(null);
    setDialogOpen(true);
  };

  const openEditDialog = (employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  const openDeleteDialog = (employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteEmployeeMutation.mutate(selectedEmployee.id, {
        onSuccess: () => setDeleteDialogOpen(false)
    });
  };

  return (
    <>
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Employés</h1>
            <p className="text-muted-foreground">Gérez les informations de vos équipes de maintenance.</p>
          </div>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}><Plus className="mr-2 h-4 w-4" /> Nouvel employé</Button>
          </DialogTrigger>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader><CardTitle>Liste du personnel</CardTitle></CardHeader>
            <CardContent>
              {error ? (
                <p className="text-red-500 text-center py-8">Erreur de chargement des données.</p>
              ) : (
                <EmployeeTable 
                    employees={employees} 
                    isLoading={isLoading} 
                    onEdit={openEditDialog}
                    onDelete={openDeleteDialog}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <EmployeeForm
        employee={selectedEmployee} // Passe l'employé sélectionné au formulaire
        onSubmit={handleFormSubmit}
        isLoading={createEmployeeMutation.isPending || updateEmployeeMutation.isPending}
      />
    </Dialog>

    <DeleteConfirmationDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        itemName={`${selectedEmployee?.prenom} ${selectedEmployee?.nom}`}
        itemType="employé"
        loading={deleteEmployeeMutation.isPending}
    />
    </>
  );
};

export default EmployeeListPage;