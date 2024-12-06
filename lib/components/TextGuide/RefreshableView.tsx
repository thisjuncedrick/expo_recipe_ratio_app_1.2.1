import React, { ReactNode } from 'react';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';

interface RefreshableViewProps {
	children: ReactNode;
	isRefetching: boolean;
	onRefresh: () => void;
}

const RefreshableView = ({ children, isRefetching, onRefresh }: RefreshableViewProps) => {
	const { colors } = useTheme();

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ flexGrow: 1 }}
			refreshControl={
				<RefreshControl
					refreshing={isRefetching}
					onRefresh={onRefresh}
					colors={[colors.onSecondaryContainer]}
					progressBackgroundColor={colors.secondaryContainer}
				/>
			}>
			{children}
		</ScrollView>
	);
};

export default RefreshableView;
