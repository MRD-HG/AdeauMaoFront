import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { budgetAPI } from '../lib/api';
import { toast } from 'sonner';

export const useBudgetList = (filters) => {
  return useQuery({
    queryKey: ['budgets', filters],
    queryFn: () => budgetAPI.getAll(filters),
    select: (data) => data.data.data,
  });
};

export const useCreateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: budgetAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast.success("Budget ajouté avec succès.");
    },
    onError: (err) => toast.error(err.message || "Erreur lors de l'ajout."),
  });
};