import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';

const ScreenLayout = () => {
	const { colors } = useTheme();
	const client = new QueryClient();

	return (
		<QueryClientProvider client={client}>
			<Stack
				screenOptions={{
					header: (props) => {
						return (
							<Appbar.Header style={{ backgroundColor: colors.elevation.level2 }}>
								<Appbar.BackAction onPress={() => props.navigation.goBack()} />
								<Appbar.Content title={props.options.title || props.route.name} />
							</Appbar.Header>
						);
					},
					animation: 'ios_from_right',
				}}>
				<Stack.Screen name='Recipes' />
				<Stack.Screen name='Text' options={{ title: 'Text Guide' }} />
				<Stack.Screen name='Video' options={{ title: 'Video Guide' }} />
				<Stack.Screen name='TextDirections' options={{ title: 'Text Guide' }} />
			</Stack>
		</QueryClientProvider>
	);
};

export default ScreenLayout;
