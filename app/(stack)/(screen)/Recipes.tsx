import {
	ConnectionInterrupt,
	Container,
	ErrorDialog,
	LoadingDialog,
	RecipesList,
} from '@/lib/components';
import { useFetchRecipes } from '@/lib/hooks';
import { Styles } from '@/lib/ui';
import { formatText } from '@/lib/utils';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { RegisteredStyle, TextStyle, View } from 'react-native';
import { Button, Dialog, Portal, Searchbar } from 'react-native-paper';

const Recipes = (): JSX.Element => {
	const { meat } = useLocalSearchParams<{ meat: string }>();
	const router = useRouter();

	const {
		recipes, // List of fetched recipes
		searchQuery, // Current search query
		setSearchQuery, // Setter for search query input
		onSubmitSearch, // Function to handle search submission
		onClearSearch, // Function to clear the search input
		loadMoreData, // Function to load additional recipes (pagination)
		isFetchingNextPage, // Boolean indicating if the next page of data is being fetched
		isLoading, // Boolean indicating if the data is being loaded initially
		isRefetching, // Boolean indicating if data is being refetched
		refetch, // Function to manually refetch data
		isError, // Boolean indicating if an error occurred during fetching
		error, // The error object containing error details
	} = useFetchRecipes(meat);

	const [navigating, setNavigating] = useState(false);
	const [dialogVisibility, setDialogVisibility] = useState(false);
	const [currentRecipe, setCurrentRecipe] = useState<{
		recipeId: number;
		recipeName: string;
	} | null>(null);

	const handleRecipePick = useCallback(
		(id: number, recipeName: string, hasVideo: boolean) => {
			if (navigating) {
				return;
			}

			const params = { recipeId: id.toString(), recipeName: recipeName };

			if (hasVideo) {
				setCurrentRecipe({ recipeId: id, recipeName });
				setDialogVisibility(true);
			} else {
				setNavigating(true);
				router.push({ pathname: '/Text', params });
				setTimeout(() => setNavigating(false), 1000);
			}
		},
		[navigating]
	);

	const onGuidePick = useCallback(
		(method: 'text' | 'video') => {
			if (navigating || !currentRecipe) {
				return; // Prevent navigation spam or null recipe errors
			}

			const { recipeId, recipeName } = currentRecipe;
			const params = { recipeId: recipeId.toString(), recipeName };

			setNavigating(true); // Start navigation lock
			router.push({
				pathname: method === 'text' ? '/Text' : '/Video',
				params,
			});

			setDialogVisibility(false);
			setTimeout(() => setNavigating(false), 1000);
		},
		[navigating, currentRecipe]
	);

	return (
		<>
			{/* Set the screen title dynamically based on the meat type */}
			<Stack.Screen options={{ title: `${formatText(meat)} Recipes` }} />

			{/* Show loading dialog while recipes are being fetched */}
			<LoadingDialog visible={isLoading} />

			{/* Show error dialog if an error occurs and allow retrying the fetch */}
			<ErrorDialog visible={isError} errorMessage={error?.message} onRetry={refetch} />

			<ConnectionInterrupt />

			{/* Main container for the content */}
			<Container>
				{/* Search bar component for searching recipes */}
				<View style={Styles.ph_md}>
					<Searchbar
						placeholder='Search'
						onChangeText={setSearchQuery}
						onSubmitEditing={onSubmitSearch}
						value={searchQuery}
						onIconPress={onSubmitSearch}
						onClearIconPress={onClearSearch}
						inputStyle={{ minHeight: 0 }}
						style={[
							Styles.rounded_xs as RegisteredStyle<TextStyle>,
							Styles.mv_sm as RegisteredStyle<TextStyle>,
							{ height: 45 },
						]}
					/>
				</View>

				{/* List of recipes with pagination and refetch capabilities */}
				<View style={[Styles.flex_1]}>
					<RecipesList
						recipes={recipes}
						loadMoreData={loadMoreData}
						isFetchingNextPage={isFetchingNextPage}
						isRefetching={isRefetching}
						refetch={refetch}
						onRecipePick={handleRecipePick}
					/>
				</View>
			</Container>

			{/* Dialog popup for video/text guide */}
			<Portal>
				<Dialog visible={dialogVisibility} dismissableBackButton={false} dismissable={false}>
					<Dialog.Title>Choose guide</Dialog.Title>
					<Dialog.Content style={{ rowGap: Number(Styles.m_sm.margin) }}>
						<Button
							mode='contained'
							onPress={() => {
								onGuidePick('text');
							}}>
							Text Guide
						</Button>
						<Button
							mode='contained'
							onPress={() => {
								onGuidePick('video');
							}}>
							Video Guide
						</Button>
						<Button mode='text' onPress={() => setDialogVisibility(false)}>
							Close
						</Button>
					</Dialog.Content>
				</Dialog>
			</Portal>
		</>
	);
};

export default Recipes;
