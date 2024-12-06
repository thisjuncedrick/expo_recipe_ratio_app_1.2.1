import { useLoadResources } from '@/lib/hooks';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider } from 'expo-sqlite';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const colorScheme = useColorScheme();
	const paperTheme = colorScheme == 'dark' ? MD3DarkTheme : MD3LightTheme;

	const isLoaded = useLoadResources();

	useEffect(() => {
		console.log(Boolean(isLoaded));
		const hideSplashScreen = async () => {
			if (isLoaded) {
				try {
					console.log('Hiding splash screen...');
					await SplashScreen.hideAsync();
					console.log('Splash screen hidden');
				} catch (error) {
					console.error('Error hiding splash screen:', error);
				}
			}
		};

		hideSplashScreen();
	}, [isLoaded]);

	return (
		<SQLiteProvider databaseName={'DB_Recipe_Ratio.db'}>
			<PaperProvider theme={paperTheme}>
				<Stack
					screenOptions={{
						headerShown: false,
						statusBarBackgroundColor: paperTheme.colors.elevation.level2,
						navigationBarColor: paperTheme.colors.elevation.level2,
						animation: 'ios_from_right',
					}}>
					<Stack.Screen name='index' />
					<Stack.Screen name='(stack)' />
				</Stack>
			</PaperProvider>
		</SQLiteProvider>
	);
};
export default RootLayout;
