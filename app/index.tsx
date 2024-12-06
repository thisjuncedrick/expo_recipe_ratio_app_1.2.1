import { Container } from '@/lib/components';
import { Styles } from '@/lib/ui';
import { Asset } from 'expo-asset';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, TextStyle, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

const Index = () => {
	const router = useRouter();
	const { colors } = useTheme();

	const APP_BANNER = Asset.fromModule(require('@/assets/images/dish-8723519_1920-min.jpg')).uri;

	const onCTAPress = () => {
		router.push({ pathname: '/Home' });
	};

	return (
		<Container>
			<View style={Styles.flex_1}>
				<ImageBackground source={{ uri: APP_BANNER }} style={Styles.h_full} />
			</View>
			<View style={[Styles.p_md]}>
				<Text variant='headlineSmall' style={[{ color: colors.primary, fontWeight: 'bold' }]}>
					Ready to Spice Things Up?
				</Text>
				<Text variant='titleMedium' style={Styles.pb_md as TextStyle}>
					Find fresh recipes to surprise your taste buds.
				</Text>
				<Button mode='contained' onPress={onCTAPress}>
					Let's Get Cooking!
				</Button>
			</View>
		</Container>
	);
};

export default Index;
