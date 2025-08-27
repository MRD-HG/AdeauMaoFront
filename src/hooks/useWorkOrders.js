import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workOrderAPI } from '../lib/api';
import { toast } from 'sonner';

export const workOrderKeys = {
  all: ['workOrders'],
  lists: () => [...workOrderKeys.all, 'list'],
  list: (filters) => [...workOrderKeys.lists(), { filters }],
  details: () => [...workOrderKeys.all, 'detail'],
  detail: (id) => [...workOrderKeys.details(), id],
};

export const useWorkOrderList = (filters) => {
  return useQuery({
    queryKey: workOrderKeys.list(filters),
    queryFn: () => workOrderAPI.getAll(filters),
    select: (data) => data.data.data,
  });
};

export const useWorkOrder = (id) => {
  return useQuery({
    queryKey: workOrderKeys.detail(id),
    queryFn: () => workOrderAPI.getById(id),
    select: (data) => data.data.data,
    enabled: !!id,
  });
};

export const useCreateWorkOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: workOrderAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workOrderKeys.lists() });
      toast.success("Ordre de travail créé avec succès.");
    },
    onError: (err) => toast.error(err.message || "Erreur lors de la création de l'OT."),
  });
};

export const useUpdateWorkOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => workOrderAPI.update(id, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: workOrderKeys.lists() });
            queryClient.invalidateQueries({ queryKey: workOrderKeys.detail(variables.id) });
            toast.success("Ordre de travail mis à jour.");
        },
        onError: (err) => toast.error(err.message || "Erreur lors de la mise à jour."),
    });
};

export const useDeleteWorkOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: workOrderAPI.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: workOrderKeys.lists() });
            toast.success("Ordre de travail supprimé.");
        },
        onError: (err) => toast.error(err.message || "Erreur lors de la suppression."),
    });
};