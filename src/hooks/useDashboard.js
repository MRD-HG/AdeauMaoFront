import { useQuery } from '@tanstack/react-query';
import { dashboardAPI } from '../lib/api';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => dashboardAPI.getStats(),
    select: (data) => data.data.data,
  });
};