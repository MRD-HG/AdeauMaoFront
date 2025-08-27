import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Plus } from 'lucide-react';
import { useTeamList, useCreateTeam, useUpdateTeam } from '../../hooks/useTeams';
import TeamTable from './TeamTable';
import TeamForm from './TeamForm';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogTrigger } from '../../components/ui/dialog';
import { motion } from 'framer-motion';

const TeamListPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  
  const { data, isLoading, error } = useTeamList({});
  const createTeamMutation = useCreateTeam();
  const updateTeamMutation = useUpdateTeam();

  const handleFormSubmit = (formData) => {
    if (selectedTeam) {
      updateTeamMutation.mutate({ id: selectedTeam.id, data: formData }, {
        onSuccess: () => setDialogOpen(false),
      });
    } else {
      createTeamMutation.mutate(formData, {
        onSuccess: () => setDialogOpen(false),
      });
    }
  };

  const openDialogForEdit = (team) => {
    setSelectedTeam(team);
    setDialogOpen(true);
  };
  
  const openDialogForCreate = () => {
    setSelectedTeam(null);
    setDialogOpen(true);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="space-y-6">
        <motion.div /* ... */ >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Équipes</h1>
            <p className="text-gray-600 mt-1">Gestion des équipes de maintenance</p>
          </div>
          <DialogTrigger asChild>
            <Button onClick={openDialogForCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une équipe
            </Button>
          </DialogTrigger>
        </motion.div>

        <motion.div /* ... */ >
          <Card>
            <CardHeader>
              <CardTitle>Liste des équipes</CardTitle>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="text-red-600 text-center py-8">Erreur: {error.message}</div>
              ) : (
                <TeamTable 
                  teams={data?.items || []} 
                  isLoading={isLoading}
                  onEdit={openDialogForEdit}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <TeamForm 
        team={selectedTeam} 
        onSubmit={handleFormSubmit} 
        isLoading={createTeamMutation.isPending || updateTeamMutation.isPending}
      />
    </Dialog>
  );
};

export default TeamListPage;