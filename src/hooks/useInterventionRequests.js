import { useQuery } from '@tanstack/react-query';
import { interventionRequestAPI } from '../lib/api';

export const useInterventionRequestList = (filters) => {
  return useQuery({
    queryKey: ['interventionRequests', filters],
    queryFn: () => interventionRequestAPI.getAll(filters),
    select: (data) => data.data.data,
  });
};