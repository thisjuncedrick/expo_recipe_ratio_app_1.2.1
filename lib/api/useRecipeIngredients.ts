import { requestAPI } from '@/lib/api/AxiosInstance';
import { RecipeIngredients } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export const useRecipeIngredients = (recipeId: string) => {
	return useQuery({
		queryKey: ['recipeIngredients', recipeId],
		queryFn: async () => {
			const response = await requestAPI(`/recipe/${recipeId}?append=ingredients`);
			return response.recipe[0] as RecipeIngredients;
		},
		staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
		gcTime: 1000 * 60 * 30, // Keep unused data in cache for 30 minutes
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
};
