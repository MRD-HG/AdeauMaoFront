import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { equipmentAPI } from '../lib/api';
import { toast } from 'sonner';

// Query keys
export const equipmentKeys = {
  all: ['equipment'],
  lists: () => [...equipmentKeys.all, 'list'],
  list: (filters) => [...equipmentKeys.lists(), { filters }],
  details: () => [...equipmentKeys.all, 'detail'],
  detail: (id) => [...equipmentKeys.details(), id],
  organes: (equipmentId) => [...equipmentKeys.all, 'organes', equipmentId],
};

// Get equipment list with filters
export const useEquipmentList = (filters = {}) => {
  return useQuery({
    queryKey: equipmentKeys.list(filters),
    queryFn: () => equipmentAPI.getAll(filters),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get single equipment by ID
export const useEquipment = (id) => {
  return useQuery({
    queryKey: equipmentKeys.detail(id),
    queryFn: () => equipmentAPI.getById(id),
    select: (data) => data.data.data,
    enabled: !!id,
  });
};

// Get equipment by reference
export const useEquipmentByReference = (reference) => {
  return useQuery({
    queryKey: [...equipmentKeys.all, 'reference', reference],
    queryFn: () => equipmentAPI.getByReference(reference),
    select: (data) => data.data.data,
    enabled: !!reference,
  });
};

// Get equipment organes
export const useEquipmentOrganes = (equipmentId) => {
  return useQuery({
    queryKey: equipmentKeys.organes(equipmentId),
    queryFn: () => equipmentAPI.getOrganes(equipmentId),
    select: (data) => data.data.data,
    enabled: !!equipmentId,
  });
};

// Create equipment mutation
export const useCreateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: equipmentAPI.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: equipmentKeys.lists() });
      toast.success('Équipement créé avec succès');
      return data.data.data;
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erreur lors de la création';
      toast.error(message);
    },
  });
};

// Update equipment mutation
export const useUpdateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => equipmentAPI.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: equipmentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: equipmentKeys.detail(variables.id) });
      toast.success('Équipement mis à jour avec succès');
      return data.data.data;
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erreur lors de la mise à jour';
      toast.error(message);
    },
  });
};

// Delete equipment mutation
export const useDeleteEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: equipmentAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: equipmentKeys.lists() });
      toast.success('Équipement supprimé avec succès');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erreur lors de la suppression';
      toast.error(message);
    },
  });
};

// Create organe mutation
export const useCreateOrgane = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: equipmentAPI.createOrgane,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: equipmentKeys.organes(variables.equipementId) 
      });
      toast.success('Organe créé avec succès');
      return data.data.data;
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erreur lors de la création de l\'organe';
      toast.error(message);
    },
  });
};

// Delete organe mutation
export const useDeleteOrgane = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: equipmentAPI.deleteOrgane,
    onSuccess: (_, organeId) => {
      // Invalidate all organes queries since we don't know which equipment this organe belongs to
      queryClient.invalidateQueries({ 
        queryKey: [...equipmentKeys.all, 'organes'] 
      });
      toast.success('Organe supprimé avec succès');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erreur lors de la suppression de l\'organe';
      toast.error(message);
    },
  });
};

