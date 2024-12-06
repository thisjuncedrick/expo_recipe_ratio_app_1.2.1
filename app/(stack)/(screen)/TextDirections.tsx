import { useRecipeDirections } from '@/lib/api';
import {
	ConnectionInterrupt,
	Container,
	DirectionsSlide,
	ErrorDialog,
	LoadingDialog,
} from '@/lib/components';
import { Styles } from '@/lib/ui';
import { isValidUrl } from '@/lib/utils';
import { Asset } from 'expo-asset';
import { ImageBackground } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const { height, width } = Dimensions.get('window');
const Directions = () => {
	const PLACEHOLDER = Asset.fromModule(require('@/assets/images/blank_image_placeholder.png')).uri;
	const { recipeId, recipeName } = useLocalSearchParams<{
		recipeId: string;
		recipeName: string;
	}>();

	const { colors } = useTheme();
	const [imageUri, setImageUri] = useState('');
	const [componentsLoading, setComponentsLoading] = useState({
		directions: false,
		background: false,
	});
	const { data, isLoading, refetch, isError, error } = useRecipeDirections(recipeId);

	useEffect(() => {
		if (data) {
			setImageUri(isValidUrl(data.cover_image) ? data.cover_image : PLACEHOLDER);
		}
	}, [data]);

	return (
		<>
			<Stack.Screen options={{ title: recipeName }} />
			{/* Show loading dialog while recipes are being fetched */}
			<LoadingDialog visible={isLoading} />

			{/* Show error dialog if an error occurs and allow retrying the fetch */}
			<ErrorDialog visible={isError} errorMessage={error?.message} onRetry={refetch} />

			<ConnectionInterrupt />

			<Container>
				{data ? (
					<>
						<ImageBackground
							source={imageUri}
							style={{ width, height }}
							onError={() => setImageUri(PLACEHOLDER)}>
							<View
								style={[
									Styles.flex_1,
									{ backgroundColor: colors.elevation.level2, opacity: 0.8 },
								]}></View>
						</ImageBackground>

						<View style={[Styles.absolute_fill]}>
							<DirectionsSlide directions={data.directions} />
						</View>
					</>
				) : null}
			</Container>
		</>
	);
};

export default Directions;
