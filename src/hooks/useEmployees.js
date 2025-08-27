import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeAPI } from '../lib/api';
import { toast } from 'sonner';

export const employeeKeys = {
  all: ['employees'],
  lists: () => [...employeeKeys.all, 'list'],
  list: (filters) => [...employeeKeys.lists(), { filters }],
};

export const useEmployeeList = (filters) => {
  return useQuery({
    queryKey: employeeKeys.list(filters),
    queryFn: () => employeeAPI.getAll(filters),
    select: (data) => data.data.data,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: employeeAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      toast.success("Employé ajouté avec succès.");
    },
    onError: (err) => toast.error(err.message || "Erreur lors de l'ajout."),
  });
};