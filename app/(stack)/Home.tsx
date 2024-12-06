import { Container, DoubleBackExit } from '@/lib/components';
import { useTapSequenceHandler } from '@/lib/hooks';
import { Styles } from '@/lib/ui';
import { getItemMargins } from '@/lib/utils';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { Appbar, Text, Tooltip, TouchableRipple, useTheme } from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width;
const COLUMN_COUNT = 2;
const H_PADDING_SIZE = Number(Styles.p_lg.padding);
const ITEM_SIZE = (SCREEN_WIDTH - H_PADDING_SIZE * 2) / COLUMN_COUNT;

interface MeatItem {
	label: string;
	icon: string;
	iconPack: React.ComponentType<any>;
}

const Home = () => {
	const { colors } = useTheme();
	const router = useRouter();

	const handleTap = useTapSequenceHandler(300);
	const [isPressing, setIsPressing] = useState({ about: false, glossary: false });

	const MEAT_TYPES: MeatItem[] = useMemo(
		() => [
			{ label: 'Chicken', icon: 'food-drumstick', iconPack: MaterialCommunityIcons },
			{ label: 'Pork', icon: 'pig-variant', iconPack: MaterialCommunityIcons },
			{ label: 'Fish', icon: 'fish-fins', iconPack: FontAwesome6 },
			{ label: 'Beef', icon: 'cow', iconPack: FontAwesome6 },
		],
		[]
	);

	const handlePickMeat = useCallback((meat: string) => {
		const param = meat.toLowerCase();
		router.push({ pathname: '/(screen)/Recipes', params: { meat: param } });
	}, []);

	const handlePress = (page: 'about' | 'glossary') => {
		if (isPressing[page]) {
			return;
		}

		const path = `/${page.charAt(0).toUpperCase() + page.slice(1)}`;
		router.push(path);
		setIsPressing((prev) => ({ ...prev, [page]: true }));

		setTimeout(() => {
			setIsPressing((prev) => ({ ...prev, [page]: false }));
		}, 1000);
	};

	const RenderMeatFrame = React.memo(
		({ item, index, totalItems }: { item: MeatItem; index: number; totalItems: number }) => {
			const IconPack = item.iconPack;
			const gridMargins = getItemMargins(index, totalItems);

			return (
				<View
					style={[
						Styles.hide_excess,
						Styles.rounded_xs,
						Styles.flex_1,
						gridMargins,
						{
							height: ITEM_SIZE,
							backgroundColor: colors.elevation.level3,
							borderColor: colors.outlineVariant,
							borderWidth: 1,
						},
					]}>
					<TouchableRipple
						style={[Styles.flex_1, Styles.centered_view]}
						onPress={() => handlePickMeat(item.label)}>
						<View style={[Styles.centered_view, { rowGap: 10 }]}>
							<IconPack name={item.icon} size={35} color={colors.primary} />
							<Text variant='titleMedium'>{item.label}</Text>
						</View>
					</TouchableRipple>
				</View>
			);
		}
	);

	return (
		<>
			<DoubleBackExit />
			<Appbar.Header>
				<Tooltip title='About'>
					<Appbar.Action icon='information' onPress={() => handlePress('about')} />
				</Tooltip>
				<Appbar.Content title='' />
				<Tooltip title='Glossary'>
					<Appbar.Action
						icon='newspaper-variant-outline'
						onPress={() => handlePress('glossary')}
					/>
				</Tooltip>
			</Appbar.Header>
			<Container>
				<View style={[Styles.flex_1, Styles.justify_center]}>
					<View style={{ paddingHorizontal: H_PADDING_SIZE }}>
						<View style={Styles.mb_lg}>
							<Text
								variant='displayMedium'
								style={[Styles.textBold, { color: colors.primary }]}
								onPress={() => handleTap('top')}>
								choose your
							</Text>
							<Text
								variant='displayMedium'
								style={Styles.textBold}
								onPress={() => handleTap('bottom')}>
								meat type
							</Text>
						</View>
						<FlatList
							data={MEAT_TYPES}
							keyExtractor={(_, index) => index.toString()}
							renderItem={({ item, index }) => (
								<RenderMeatFrame item={item} index={index} totalItems={MEAT_TYPES.length} />
							)}
							numColumns={COLUMN_COUNT}
						/>
					</View>
				</View>
			</Container>
		</>
	);
};

export default Home;
