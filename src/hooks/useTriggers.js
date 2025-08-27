import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { triggerAPI } from '../lib/api';
import { toast } from 'sonner';

export const useTriggerList = (filters) => {
  return useQuery({
    queryKey: ['triggers', filters],
    queryFn: () => triggerAPI.getAll(filters),
    select: (data) => data.data.data,
  });
};

export const useCreateTrigger = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: triggerAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['triggers'] });
            toast.success("Déclencheur ajouté avec succès.");
        },
    });
};