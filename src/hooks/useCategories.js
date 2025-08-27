import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryAPI } from '../lib/api';
import { toast } from 'sonner';

export const useCategoryList = (filters) => {
  return useQuery({
    queryKey: ['categories', filters],
    queryFn: () => categoryAPI.getAll(filters),
    select: (data) => data.data.data,
  });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: categoryAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success("Catégorie ajoutée avec succès.");
        },
    });
};