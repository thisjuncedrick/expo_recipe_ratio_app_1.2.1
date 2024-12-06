import { useRecipeIngredients } from '@/lib/api';
import {
	AddIngredients,
	ConnectionInterrupt,
	Container,
	deleteIngredient,
	ErrorDialog,
	fetchCustomIngredients,
	IngredientsChecklist,
	insertIngredient,
	LoadingDialog,
	RecipeImagePreview,
	RefreshableView,
	ServingsInput,
} from '@/lib/components';
import { useCheckList, useServingsCounter } from '@/lib/hooks';
import { CustomIngredient } from '@/lib/types';
import { Styles } from '@/lib/ui';
import { isValidUrl } from '@/lib/utils';
import { Asset } from 'expo-asset';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useCallback, useEffect, useState } from 'react';
import { TextStyle, View } from 'react-native';
import { Button, Divider, Text, useTheme } from 'react-native-paper';

const Ingredients = () => {
	const { recipeId, recipeName } = useLocalSearchParams<{
		recipeId: string;
		recipeName: string;
	}>();

	const db = useSQLiteContext();
	const router = useRouter();
	const { colors } = useTheme();
	const PLACEHOLDER = Asset.fromModule(require('@/assets/images/blank_image_placeholder.png')).uri;

	const [imageUri, setImageUri] = useState<string>('');
	const [ingredientsList, setIngredientsList] = useState<CustomIngredient[]>([]);
	const [addSheet, setAddSheet] = useState<boolean>(false);

	const { data, isLoading, isRefetching, refetch, isError, error } =
		useRecipeIngredients(recipeId);

	const { servings, inputValue, setInputValue, validateAndSetServings } = useServingsCounter();
	const { checkedItems, toggleChecked, allChecked, toggleAll } = useCheckList(ingredientsList);

	const refetchIngredients = useCallback(async () => {
		if (data) {
			const customIngredients = await fetchCustomIngredients(db, recipeId); // Call query function
			const regularIngredients: CustomIngredient[] = data.ingredients.map((ingredient, i) => ({
				...ingredient,
				isCustom: false,
				id: i,
			}));
			setIngredientsList([...regularIngredients, ...customIngredients]);
		}
	}, [data, db, recipeId]);

	useEffect(() => {
		if (data) {
			setImageUri(isValidUrl(data.cover_image) ? data.cover_image : PLACEHOLDER);
			refetchIngredients();
		}
	}, [data, refetchIngredients]);

	// Handle start cooking when all ingredients are checked, then proceed to `Directions` screen
	const handleStartCooking = () => {
		router.push({
			pathname: '/TextDirections',
			params: { recipeId, recipeName },
		});
	};

	return (
		<>
			<LoadingDialog visible={isLoading} />
			<ErrorDialog visible={isError} errorMessage={error?.message} onRetry={refetch} />
			<ConnectionInterrupt />
			<Container>
				{data ? (
					<RefreshableView onRefresh={refetch} isRefetching={isRefetching}>
						<RecipeImagePreview imageUri={imageUri} thumbhash={data.thumbhash} />
						<View style={Styles.p_md}>
							<Text
								variant='titleLarge'
								numberOfLines={2}
								style={[Styles.textBold, { color: colors.primary }]}>
								{data.name.toUpperCase()}
							</Text>
							<Divider style={Styles.mv_sm} bold={true} />
							<Text style={[{ textAlign: 'justify' }, Styles.mb_md as TextStyle]}>
								{data.description}
							</Text>

							<View style={Styles.mb_md}>
								<ServingsInput
									value={inputValue}
									setInput={setInputValue}
									validateInput={validateAndSetServings}
								/>
							</View>

							<View>
								<IngredientsChecklist
									ingredients={ingredientsList}
									deleteIngredientCallback={(id) =>
										deleteIngredient(db, id, refetchIngredients)
									}
									servings={servings}
									checkedItems={checkedItems}
									toggleChecked={toggleChecked}
									toggleAllState={toggleAll}
									allChecked={Boolean(allChecked)}
									addIngredientsCallback={() => setAddSheet(true)}
								/>
							</View>
							<Button onPress={handleStartCooking} mode='contained-tonal' uppercase>
								Start Cooking
							</Button>
						</View>
					</RefreshableView>
				) : null}
			</Container>
			<AddIngredients
				isVisible={addSheet}
				onClose={() => setAddSheet(false)}
				onAddIngredients={(ingredients) =>
					insertIngredient(db, recipeId, ingredients, refetchIngredients)
				}
			/>
		</>
	);
};

export default Ingredients;
