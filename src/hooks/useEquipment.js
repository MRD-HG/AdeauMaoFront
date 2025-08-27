import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { equipmentAPI } from '../lib/api';
import { toast } from 'sonner';

// Query keys for managing cache invalidation and dependencies
export const equipmentKeys = {
  all: ['equipment'],
  lists: () => [...equipmentKeys.all, 'list'],
  list: (filters) => [...equipmentKeys.lists(), { filters }],
  details: () => [...equipmentKeys.all, 'detail'],
  detail: (id) => [...equipmentKeys.details(), id],
  organes: (equipmentId) => [...equipmentKeys.all, 'organes', equipmentId],
};

// Hook to get a single equipment by its ID
export const useEquipmentById = (id) => {
  return useQuery({
    queryKey: equipmentKeys.detail(id),
    queryFn: () => equipmentAPI.getById(id),
    enabled: !!id, // Only run the query if the id is provided
    select: (data) => data.data.data, // Select the nested data from the API response
  });
};

// Hook to get a paginated and filtered list of equipment
export const useEquipmentList = (filters = {}) => {
  return useQuery({
    queryKey: equipmentKeys.list(filters),
    queryFn: () => equipmentAPI.getAll(filters),
    select: (data) => data.data, // The list endpoint returns data at a different level
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};

// Hook to get a single equipment by its reference string
export const useEquipmentByReference = (reference) => {
  return useQuery({
    queryKey: [...equipmentKeys.all, 'reference', reference],
    queryFn: () => equipmentAPI.getByReference(reference),
    select: (data) => data.data.data,
    enabled: !!reference,
  });
};

// Hook to get the list of organes for a specific equipment
export const useEquipmentOrganes = (equipmentId) => {
  return useQuery({
    queryKey: equipmentKeys.organes(equipmentId),
    queryFn: () => equipmentAPI.getOrganes(equipmentId),
    select: (data) => data.data.data,
    enabled: !!equipmentId,
  });
};
export const useEquipment = (id) => {
  return useQuery({
    queryKey: ['equipment', id], // A simplified key for a single item
    queryFn: () => equipmentAPI.getById(id),
    select: (data) => data.data.data, // Selects the nested data object
    enabled: !!id, // The query will not run until the id is available
  });
};

// Hook for the mutation to create a new equipment
export const useCreateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: equipmentAPI.create, // Correctly uses the method from the imported object
    onSuccess: (data) => {
      // When creation is successful, invalidate all list queries to refetch
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

// Hook for the mutation to update an existing equipment
export const useUpdateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => equipmentAPI.update(id, data),
    onSuccess: (data, variables) => {
      // Invalidate both the list and the specific detail query for this item
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

// Hook for the mutation to delete an equipment
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
export const useOrganes = (equipmentId) => {
  return useQuery({
    queryKey: ['organes', equipmentId],
    queryFn: () => equipmentAPI.getOrganes(equipmentId),
    select: (data) => data.data.data,
    enabled: !!equipmentId,
  });
};

export const useCreateOrgane = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ equipmentId, data }) => equipmentAPI.createOrgane(equipmentId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['organes', variables.equipmentId] });
      toast.success("Organe ajouté avec succès.");
    },
    onError: (err) => toast.error(err.message || "Erreur lors de l'ajout de l'organe."),
  });
};

export const useDeleteOrgane = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (organeId) => equipmentAPI.deleteOrgane(organeId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organes'] }); // Invalide toutes les listes d'organes
            toast.success("Organe supprimé avec succès.");
        },
        onError: (err) => toast.error(err.message || "Erreur lors de la suppression."),
    });
};