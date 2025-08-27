import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userAPI } from '../lib/api';
import { toast } from 'sonner';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, data }) => userAPI.updateProfile(userId, data),
    onSuccess: () => {
      // Invalider les requêtes liées à l'utilisateur pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ['user'] }); 
      toast.success("Profil mis à jour avec succès.");
    },
    onError: (err) => {
      toast.error(err.message || "Erreur lors de la mise à jour du profil.");
    },
  });
};