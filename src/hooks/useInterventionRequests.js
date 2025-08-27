import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { interventionRequestAPI } from '../lib/api';
import { toast } from 'sonner';

export const interventionRequestKeys = {
  all: ['interventionRequests'],
  lists: () => [...interventionRequestKeys.all, 'list'],
  list: (filters) => [...interventionRequestKeys.lists(), { filters }],
  details: () => [...interventionRequestKeys.all, 'detail'],
  detail: (id) => [...interventionRequestKeys.details(), id],
};

export const useInterventionRequestList = (filters) => {
  return useQuery({
    queryKey: interventionRequestKeys.list(filters),
    queryFn: () => interventionRequestAPI.getAll(filters),
    select: (data) => data.data.data,
  });
};

export const useInterventionRequest = (id) => {
  return useQuery({
    queryKey: interventionRequestKeys.detail(id),
    queryFn: () => interventionRequestAPI.getById(id),
    select: (data) => data.data.data,
    enabled: !!id,
  });
};

export const useCreateInterventionRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: interventionRequestAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: interventionRequestKeys.lists() });
      toast.success("Demande d'intervention créée avec succès.");
    },
    onError: (err) => toast.error(err.message || "Erreur lors de la création."),
  });
};