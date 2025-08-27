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

// ... Ajoutez ici les autres hooks (useWorkOrder, useCreateWorkOrder, etc.) en suivant le même modèle