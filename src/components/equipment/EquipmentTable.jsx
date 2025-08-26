import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Wrench,
  MapPin,
  Calendar
} from 'lucide-react';
import { formatDate, getStatusColor, truncateText } from '../../lib/utils';
import { useDeleteEquipment } from '../../hooks/useEquipment';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const EquipmentTable = ({ equipment = [], isLoading = false }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState(null);
  
  const { hasAnyRole } = useAuth();
  const deleteEquipmentMutation = useDeleteEquipment();

  const canEdit = hasAnyRole(['Administrator', 'Manager']);
  const canDelete = hasAnyRole(['Administrator']);

  const handleDeleteClick = (equipment) => {
    setEquipmentToDelete(equipment);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (equipmentToDelete) {
      await deleteEquipmentMutation.mutateAsync(equipmentToDelete.id);
      setDeleteDialogOpen(false);
      setEquipmentToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!equipment.length) {
    return (
      <div className="text-center py-12">
        <Wrench className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Aucun équipement trouvé
        </h3>
        <p className="text-gray-500">
          Commencez par ajouter votre premier équipement.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Référence</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Fabricant</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>État</TableHead>
              <TableHead>Date de mise en service</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group hover:bg-gray-50"
              >
                <TableCell className="font-medium">
                  <Link 
                    to={`/equipment/${item.id}`}
                    className="text-primary hover:text-primary/80 font-mono"
                  >
                    {item.reference}
                  </Link>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">
                      {truncateText(item.nom, 30)}
                    </div>
                    {item.description && (
                      <div className="text-sm text-gray-500">
                        {truncateText(item.description, 40)}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Wrench className="h-4 w-4 text-gray-400 mr-2" />
                    {item.typeEquipement || '-'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium">{item.fabricant || '-'}</div>
                    {item.modele && (
                      <div className="text-gray-500">{item.modele}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {truncateText(item.localisation, 25) || '-'}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.etatOperationnel)}>
                    {item.etatOperationnel || 'Non défini'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(item.dateMiseEnService) || '-'}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to={`/equipment/${item.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir les détails
                        </Link>
                      </DropdownMenuItem>
                      {canEdit && (
                        <DropdownMenuItem asChild>
                          <Link to={`/equipment/${item.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {canDelete && (
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(item)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'équipement "{equipmentToDelete?.nom}" ?
              Cette action est irréversible et supprimera également tous les ordres de travail associés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteEquipmentMutation.isPending}
            >
              {deleteEquipmentMutation.isPending ? 'Suppression...' : 'Supprimer'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EquipmentTable;

