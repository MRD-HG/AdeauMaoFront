import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { MoreHorizontal, Edit, Trash2, Users } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { DeleteConfirmationDialog } from '../../components/ui/confirmation-dialog';
import { useDeleteTeam } from '../../hooks/useTeams';
import { motion } from 'framer-motion';

// Add 'onEdit' here to receive the function from the parent page
const TeamTable = ({ teams = [], isLoading = false, onEdit }) => {
  const [deleteDialog, setDeleteDialog] = useState({ open: false, team: null });
  const deleteTeamMutation = useDeleteTeam();

  const handleDelete = () => {
    if (deleteDialog.team) {
      deleteTeamMutation.mutate(deleteDialog.team.id, {
        onSuccess: () => setDeleteDialog({ open: false, team: null }),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }
  
  if (teams.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Aucune équipe trouvée
        </h3>
        <p className="text-gray-500">
          Commencez par ajouter votre première équipe de maintenance.
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
              <TableHead>Équipe</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team, index) => (
              <motion.tr
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group hover:bg-gray-50"
              >
                <TableCell className="font-mono">{team.reference}</TableCell>
                <TableCell className="font-medium">{team.nom}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* This onClick will now correctly call the function passed from the parent */}
                      <DropdownMenuItem onClick={() => onEdit(team)}>
                        <Edit className="mr-2 h-4 w-4" /> Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => setDeleteDialog({ open: true, team: team })}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, team: open ? deleteDialog.team : null })}
        onConfirm={handleDelete}
        itemName={deleteDialog.team?.nom}
        itemType="équipe"
        loading={deleteTeamMutation.isPending}
      />
    </>
  );
};

export default TeamTable;