import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable } from 'react-native';
import ImageView from 'react-native-image-viewing';

const { height, width } = Dimensions.get('window');

interface RecipeImagePreviewProps {
	imageUri: string;
	thumbhash: string;
}

const RecipeImagePreview = ({ imageUri: uri, thumbhash }: RecipeImagePreviewProps) => {
	const [imageUri, setImageUri] = useState<string>('');

	const [imagePreview, setImagePreview] = useState<boolean>(false);

	useEffect(() => {
		setImageUri(uri);
	}, [uri]);

	const onImagePress = () => {
		setImagePreview(true);
	};

	return (
		<>
			<Pressable onPress={onImagePress} style={{ height: height / 3.5, width }}>
				<Image
					source={imageUri}
					contentFit='cover'
					cachePolicy='memory-disk'
					style={{ height: height / 3.5, width }}
					placeholder={{ thumbhash: thumbhash }}
					transition={500}
				/>
			</Pressable>
			<ImageView
				images={[{ uri: imageUri }]}
				imageIndex={0}
				visible={imagePreview}
				onRequestClose={() => setImagePreview(false)}
				presentationStyle='formSheet'
			/>
		</>
	);
};

export default RecipeImagePreview;
