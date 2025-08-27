import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workCenterAPI } from '../lib/api';
import { toast } from 'sonner';

export const useWorkCenterList = (filters) => {
  return useQuery({
    queryKey: ['workCenters', filters],
    queryFn: () => workCenterAPI.getAll(filters),
    select: (data) => data.data.data,
  });
};

export const useCreateWorkCenter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: workCenterAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workCenters'] });
            toast.success("Poste de travail ajouté avec succès.");
        },
    });
};