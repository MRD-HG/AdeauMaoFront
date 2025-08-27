import { useQuery } from '@tanstack/react-query';
import { employeeAPI } from '../lib/api';

export const useEmployeeList = (filters) => {
  return useQuery({
    queryKey: ['employees', filters],
    queryFn: () => employeeAPI.getAll(filters),
    select: (data) => data.data.data,
  });
};

// Add useCreateEmployee, useUpdateEmployee, etc. here later