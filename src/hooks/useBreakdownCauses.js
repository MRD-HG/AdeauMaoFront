import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { breakdownCauseAPI } from '../lib/api';
import { toast } from 'sonner';

export const useBreakdownCauseList = (filters) => {
  return useQuery({
    queryKey: ['breakdownCauses', filters],
    queryFn: () => breakdownCauseAPI.getAll(filters),
    select: (data) => data.data.data,
  });
};

export const useCreateBreakdownCause = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: breakdownCauseAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['breakdownCauses'] });
            toast.success("Cause de panne ajoutée avec succès.");
        },
    });
};