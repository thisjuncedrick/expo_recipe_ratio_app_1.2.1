import { Styles } from '@/lib/ui';
import { ReactNode } from 'react';
import { TextStyle } from 'react-native';
import { Paragraph as RNParagraph, Text, useTheme } from 'react-native-paper';

export const Bold = ({ children }: { children: string }) => {
	const { colors } = useTheme();
	return <Text style={[Styles.textBold, { color: colors.secondary }]}>{children}</Text>;
};

export const Parenthesis = ({ children }: { children: string | ReactNode }) => {
	return (
		<Text>
			(<Text style={Styles.textItalic}>{children}</Text>)
		</Text>
	);
};

export const Paragraph = ({
	children,
	indent = true,
}: {
	children: string | ReactNode;
	indent?: boolean;
}) => {
	return (
		<RNParagraph style={[Styles.mb_sm as TextStyle, { textAlign: 'justify' }]}>
			{indent ? '\t\t\t\t\t' : null}
			{children}
		</RNParagraph>
	);
};
