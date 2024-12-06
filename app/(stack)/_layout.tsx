import { APIProvider } from '@/lib/components';
import { Stack } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Appbar, useTheme } from 'react-native-paper';

const StackLayout = () => {
	const { colors } = useTheme();
	return (
		<APIProvider>
			<GestureHandlerRootView>
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
					<Stack.Screen name='Home' options={{ headerShown: false }} />
					<Stack.Screen name='API' options={{ title: 'Secret API Settings' }} />
					<Stack.Screen name='About' options={{ animation: 'ios_from_left' }} />
					<Stack.Screen name='Glossary' />
					<Stack.Screen name='(screen)' options={{ headerShown: false }} />
				</Stack>
			</GestureHandlerRootView>
		</APIProvider>
	);
};

export default StackLayout;
