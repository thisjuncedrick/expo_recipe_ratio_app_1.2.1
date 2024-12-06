// RecipesList.tsx
import RenderRecipeFrame from '@/lib/components/Recipes/RecipeFrame';
import { BaseRecipe, FavoriteRecipe } from '@/lib/types';
import { Styles } from '@/lib/ui';
import { formatData } from '@/lib/utils';
import React, { useCallback, useMemo } from 'react';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';

/* Constants */
const COLUMN_COUNT = 2;

/**
 * Props for the RecipesList component.
 *
 * @typedef {Object} RecipeListProps
 * @property {BaseRecipe[]} recipes - List of recipe items to display.
 * @property {function} loadMoreData - Callback to load more recipe data (pagination).
 * @property {boolean} isFetchingNextPage - Flag indicating if more data is being fetched.
 * @property {boolean} isRefetching - Flag indicating if data is being refreshed.
 * @property {function} refetch - Function to manually refetch the recipe data.
 * @property {function} onRecipePick - Callback for when a recipe is selected.
 */
interface RecipeListProps {
	recipes: BaseRecipe[] | FavoriteRecipe[];
	loadMoreData: () => void;
	isFetchingNextPage: boolean;
	isRefetching: boolean;
	refetch: () => void;
	onRecipePick: (id: number, name: string, hasVideo: boolean) => void;
}

/**
 * RecipesList renders a list of recipes in a 2-column grid, handling pagination, refreshing, and empty states.
 *
 * @param {RecipeListProps} props - The props for the RecipesList component.
 * @returns {JSX.Element} The rendered list of recipes.
 */
const RecipesList = ({
	recipes,
	loadMoreData,
	isFetchingNextPage,
	isRefetching,
	refetch,
	onRecipePick,
}: RecipeListProps): JSX.Element => {
	const { colors } = useTheme();

	// Format the data for display in the grid, ensuring proper layout for empty items
	const formattedData = useMemo(() => formatData(recipes), [recipes]);

	/**
	 * Render individual recipe frames in the grid.
	 */
	const renderItem = useCallback(
		({ item, index }: any) => (
			<RenderRecipeFrame
				item={item}
				index={index}
				totalItems={formattedData.length}
				onRecipePick={onRecipePick}
			/>
		),
		[formattedData.length, onRecipePick]
	);

	/**
	 * Key extractor to uniquely identify each recipe in the list.
	 */
	const keyExtractor = useCallback(
		(item: BaseRecipe, index: number) => item.id?.toString() || index.toString(),
		[]
	);

	return (
		<FlatList
			data={formattedData}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			showsVerticalScrollIndicator={false}
			columnWrapperStyle={Styles.pb_md}
			ListEmptyComponent={
				<Text variant='titleSmall' style={Styles.textCenter}>
					No recipes available.
				</Text>
			}
			ListFooterComponent={
				isFetchingNextPage ? <ActivityIndicator size='small' style={Styles.mt_md} /> : null
			}
			ListFooterComponentStyle={Styles.pb_xl}
			numColumns={COLUMN_COUNT}
			onEndReached={loadMoreData}
			onEndReachedThreshold={0.5}
			refreshControl={
				<RefreshControl
					refreshing={isRefetching}
					onRefresh={refetch}
					colors={[colors.onSecondaryContainer]}
					progressBackgroundColor={colors.secondaryContainer}
				/>
			}
			style={[Styles.ph_md]}
		/>
	);
};

export default RecipesList;
