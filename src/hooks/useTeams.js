import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamAPI } from '../lib/api';
import { toast } from 'sonner';

export const teamKeys = {
  all: ['teams'],
  lists: () => [...teamKeys.all, 'list'],
  list: (filters) => [...teamKeys.lists(), { filters }],
};

export const useTeamList = (filters) => {
  return useQuery({
    queryKey: teamKeys.list(filters),
    queryFn: () => teamAPI.getAll(filters),
    select: (data) => data.data.data,
  });
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: teamAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
      toast.success('Équipe créée avec succès');
    },
    onError: () => toast.error('Erreur lors de la création de l\'équipe'),
  });
};

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => teamAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
      toast.success('Équipe mise à jour avec succès');
    },
    onError: () => toast.error('Erreur lors de la mise à jour de l\'équipe'),
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: teamAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
      toast.success('Équipe supprimée avec succès');
    },
    onError: () => toast.error('Erreur lors de la suppression de l\'équipe'),
  });
};