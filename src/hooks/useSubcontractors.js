import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subcontractorAPI } from '../lib/api';
import { toast } from 'sonner';

export const useSubcontractorList = (filters) => {
  return useQuery({
    queryKey: ['subcontractors', filters],
    queryFn: () => subcontractorAPI.getAll(filters),
    select: (data) => data.data.data,
  });
};

export const useCreateSubcontractor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: subcontractorAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subcontractors'] });
            toast.success("Sous-traitant ajouté avec succès.");
        },
    });
};