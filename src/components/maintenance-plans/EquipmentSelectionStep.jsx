import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { useEquipmentList } from '../../hooks/useEquipment';
import { TableSpinner } from '../ui/loading-spinner';

const EquipmentSelectionStep = ({ selectedEquipments, onSelectionChange }) => {
  const { data, isLoading } = useEquipmentList({ pageSize: 999 }); 
  const allEquipments = data?.items || [];

  const handleSelect = (equipmentId) => {
    const isSelected = selectedEquipments.includes(equipmentId);
    if (isSelected) {
      onSelectionChange(selectedEquipments.filter(id => id !== equipmentId));
    } else {
      onSelectionChange([...selectedEquipments, equipmentId]); // Correction de la faute de frappe ici
    }
  };

  if (isLoading) return <TableSpinner />;

  return (
    <div className="rounded-lg border h-80 overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Référence</TableHead>
            <TableHead>Nom de l'Équipement</TableHead>
            <TableHead>Localisation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allEquipments.map((eq) => (
            <TableRow key={eq.id}>
              <TableCell>
                <Checkbox
                  checked={selectedEquipments.includes(eq.id)}
                  onCheckedChange={() => handleSelect(eq.id)}
                />
              </TableCell>
              <TableCell className="font-mono">{eq.reference}</TableCell>
              <TableCell className="font-medium">{eq.nom}</TableCell>
              <TableCell>{eq.localisation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EquipmentSelectionStep;