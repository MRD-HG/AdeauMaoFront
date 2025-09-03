import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Plus, Printer, Copy, FileText, FileSpreadsheet } from 'lucide-react';
import { useEquipmentList, useCreateEquipment, useUpdateEquipment, useDeleteEquipment } from '../../hooks/useEquipment';
import { useAuth } from '../../contexts/AuthContext';
import EquipmentTable from '../../components/equipment/EquipmentTable';
import EquipmentForm from '../../components/equipment/EquipmentForm';
import { Dialog, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { DeleteConfirmationDialog } from '../../components/ui/confirmation-dialog';
import EquipmentStats from '../../components/equipment/EquipmentStats'; // Import the new stats component

const EquipmentListPage = () => {
  const [filters, setFilters] = useState({ pageNumber: 1, pageSize: 10, searchTerm: '' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const { hasAnyRole } = useAuth();
  const canCreate = hasAnyRole(['Administrator', 'Manager']);

  const { data, isLoading, error } = useEquipmentList(filters);
  const createEquipmentMutation = useCreateEquipment();
  const updateEquipmentMutation = useUpdateEquipment();
  const deleteEquipmentMutation = useDeleteEquipment();

  const handleFormSubmit = (formData) => {
    if (selectedEquipment) {
      updateEquipmentMutation.mutate({ id: selectedEquipment.id, data: formData }, {
        onSuccess: () => { setDialogOpen(false); setSelectedEquipment(null); },
      });
    } else {
      createEquipmentMutation.mutate(formData, {
        onSuccess: () => setDialogOpen(false),
      });
    }
  };
  
  const openDialogForCreate = () => {
    setSelectedEquipment(null);
    setDialogOpen(true);
  };
  
  const openDialogForEdit = (equipment) => {
    setSelectedEquipment(equipment);
    setDialogOpen(true);
  };

  const openDeleteDialog = (equipment) => {
    setSelectedEquipment(equipment);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteEquipmentMutation.mutate(selectedEquipment.id, {
        onSuccess: () => setDeleteDialogOpen(false)
    });
  };

  const equipmentList = data?.data?.items || [];
  
  // Mock stats - replace with actual data from your API
  const equipmentStats = {
    total: data?.data?.totalCount || 0,
    active: equipmentList.filter(e => e.etatOperationnel === 'En service').length,
    inMaintenance: equipmentList.filter(e => e.etatOperationnel === 'En maintenance').length,
    critical: equipmentList.filter(e => e.criticite === 'Haute criticité').length,
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Equipment</h1>
              <p className="text-muted-foreground">Manage your equipment inventory and assets</p>
            </div>
            {canCreate && (
              <DialogTrigger asChild>
                <Button onClick={openDialogForCreate}>
                  <Plus className="mr-2 h-4 w-4" /> Add Equipment
                </Button>
              </DialogTrigger>
            )}
          </div>

          {/* Stat Cards */}
          <EquipmentStats stats={equipmentStats} isLoading={isLoading} />

          {/* Equipment List Card */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment List</CardTitle>
              <CardDescription>A list of all equipment in your system</CardDescription>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Search equipment..." 
                    className="w-64"
                    value={filters.searchTerm}
                    onChange={(e) => setFilters(f => ({...f, searchTerm: e.target.value, pageNumber: 1}))}
                  />
                  <Select value={String(filters.pageSize)} onValueChange={(v) => setFilters(f => ({...f, pageSize: Number(v)}))}>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 rows</SelectItem>
                      <SelectItem value="20">20 rows</SelectItem>
                      <SelectItem value="50">50 rows</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm"><Printer className="h-4 w-4 mr-2" />Print</Button>
                  <Button variant="outline" size="sm"><Copy className="h-4 w-4 mr-2" />Copy</Button>
                  <Button variant="outline" size="sm"><FileSpreadsheet className="h-4 w-4 mr-2" />Excel</Button>
                  <Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-2" />PDF</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="text-center py-12 text-red-500">Error loading equipment.</div>
              ) : (
                <EquipmentTable 
                  equipment={equipmentList} 
                  isLoading={isLoading}
                  onEdit={openDialogForEdit}
                  onDelete={openDeleteDialog}
                />
              )}
            </CardContent>
          </Card>
        </div>

        <EquipmentForm
          equipment={selectedEquipment}
          onSubmit={handleFormSubmit}
          isLoading={createEquipmentMutation.isPending || updateEquipmentMutation.isPending}
        />
      </Dialog>
      
      <DeleteConfirmationDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        itemName={selectedEquipment?.nom}
        itemType="equipment"
        loading={deleteEquipmentMutation.isPending}
      />
    </>
  );
};

export default EquipmentListPage;