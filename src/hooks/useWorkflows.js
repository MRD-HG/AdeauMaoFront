import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workflowAPI } from '../lib/api';
import { toast } from 'sonner';

export const useWorkflowList = (filters) => {
  return useQuery({
    queryKey: ['workflows', filters],
    queryFn: () => workflowAPI.getAll(filters),
    select: (data) => data.data.data,
  });
};

export const useCreateWorkflow = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: workflowAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workflows'] });
            toast.success("Workflow ajouté avec succès.");
        },
    });
};