import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ContainerProps {
	children: ReactNode;
	insets?: boolean;
}
const Container = ({ children, insets: isSafe = true }: ContainerProps) => {
	const insets = useSafeAreaInsets();
	const { colors } = useTheme();

	return (
		<>
			<View
				style={[
					isSafe
						? {
								paddingTop: insets.top,
								paddingLeft: insets.left,
								paddingRight: insets.right,
								paddingBottom: insets.bottom,
						  }
						: null,

					{ backgroundColor: colors.background, flex: 1 },
				]}>
				{children}
			</View>
		</>
	);
};

export default Container;
