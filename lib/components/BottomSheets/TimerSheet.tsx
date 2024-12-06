import {
	BottomSheetContainer,
	SheetContainerProps,
} from '@/lib/components/BottomSheets/BottomSheetContainer';
import SetTimerScreen from '@/lib/components/TextGuide/Directions/SetTimer';
import TimerScreen from '@/lib/components/TextGuide/Directions/Timer';
import { TimerContext } from '@/lib/components/TextGuide/Directions/TimerContext';
import { Styles } from '@/lib/ui';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';

interface TimerSheetProps extends SheetContainerProps {
	/** Total duration for the timer in seconds. */
	totalSeconds: number;
}

const Tabs = createBottomTabNavigator();

const TimerSheet = ({ isVisible, onClose, totalSeconds }: TimerSheetProps) => {
	const { colors } = useTheme();
	const [isRunning, setIsRunning] = useState(false);

	const handleBottomSheetClose = useCallback(() => {
		onClose();
	}, [onClose]);

	return (
		<BottomSheetContainer
			isVisible={isVisible}
			onClose={handleBottomSheetClose}
			showIndicator={false}
			snapToIndex={2}
			flex={1}>
			<TimerContext.Provider value={{ isRunning, setIsRunning }}>
				<View style={[Styles.flex_1, { width: '100%' }]}>
					<Tabs.Navigator
						screenOptions={{
							tabBarActiveTintColor: colors.primary,
							tabBarInactiveTintColor: colors.surfaceVariant,
							tabBarStyle: { backgroundColor: colors.elevation.level1, borderTopWidth: 0 },
							headerShown: false,
						}}
						screenListeners={{
							tabPress: (e) => {
								if (isRunning) {
									e.preventDefault();
								}
							},
						}}>
						<Tabs.Screen
							name='Timer'
							component={TimerScreen}
							initialParams={{ totalSeconds }}
							options={{ tabBarIcon: (props) => <Icon {...props} source='timer-outline' /> }}
						/>
						<Tabs.Screen
							name='Set Timer'
							component={SetTimerScreen}
							options={{
								tabBarIcon: (props) => <Icon {...props} source='timer-cog-outline' />,
							}}
						/>
					</Tabs.Navigator>
				</View>
			</TimerContext.Provider>
		</BottomSheetContainer>
	);
};

export default TimerSheet;
