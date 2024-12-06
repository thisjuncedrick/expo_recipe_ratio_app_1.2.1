import TimerSheet from '@/lib/components/BottomSheets/TimerSheet';
import { Direction } from '@/lib/types';
import { Styles } from '@/lib/ui';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, TextStyle, View } from 'react-native';
import { Button, Card, Divider, IconButton, Text, useTheme } from 'react-native-paper';
import Swiper from 'react-native-swiper';

const { height, width } = Dimensions.get('window');
const SLIDE_WIDTH = width * 0.8;
const MIN_HEIGHT = height / 2.5;

interface DirectionsSlidesProps {
	directions: Direction[];
}

const DirectionsSlide = ({ directions }: DirectionsSlidesProps) => {
	const { colors } = useTheme();
	const router = useRouter();
	const [timerVisible, setTimerVisibility] = useState<boolean>(false);

	const [totalSeconds, setTotalSeconds] = useState(0);

	const handleTimer = (duration: number | null, unit: string | null) => {
		let seconds = 0;
		switch (unit?.toLowerCase()) {
			case 'min':
			case 'mins':
				seconds = (duration || 0) * 60;
				break;
			case 'hr':
			case 'hrs':
				seconds = (duration || 0) * 60 * 60;
				break;
			case 'day':
			case 'days':
				seconds = (duration || 0) * 60 * 60 * 24;
				break;
			case 'sec':
			case 'secs':
				seconds = duration || 0;
				break;
			default:
				throw new Error('Invalid unit: ' + unit);
		}
		setTimerVisibility(true);
		setTotalSeconds(seconds);
	};

	const directionsSlide = directions.map((direction, i) => (
		<Card
			key={i}
			style={[
				Styles.p_md,
				Styles.flex,
				Styles.flex_col,
				Styles.justify_center,
				Styles.mh_auto,
				Styles.mv_auto,
				{ width: SLIDE_WIDTH, minHeight: MIN_HEIGHT },
			]}>
			<Card.Content>
				<Text style={[Styles.textCenter, { color: colors.secondary }]}>
					Step {i + 1} of {directions.length}
				</Text>
				<Divider style={Styles.mv_sm} bold />
				<Text style={[Styles.mb_lg as TextStyle, { textAlign: 'justify', fontSize: 16 }]}>
					{direction.description}
				</Text>

				{direction.duration && direction.duration_unit && (
					<Button
						mode='contained'
						onPress={() => handleTimer(direction.duration, direction.duration_unit)}>
						Start Timer ({direction.duration} {direction.duration_unit})
					</Button>
				)}
			</Card.Content>
		</Card>
	));

	const returnSlide = (
		<Card
			style={[
				Styles.p_md,
				Styles.flex,
				Styles.flex_col,
				Styles.justify_center,
				Styles.mh_auto,
				Styles.mv_auto,
				{ width: SLIDE_WIDTH, minHeight: MIN_HEIGHT },
			]}>
			<Card.Content>
				<Text variant='titleLarge' style={[Styles.textBold, { color: colors.primary }]}>
					Hungry for more?
				</Text>
				<Text variant='bodyMedium' style={[Styles.textNormal, Styles.mb_md as TextStyle]}>
					Let's cook another masterpiece together.
				</Text>
				<Button
					onPress={() => router.dismiss(2)}
					mode='outlined'
					icon='chevron-right'
					contentStyle={{ flexDirection: 'row-reverse' }}
					labelStyle={Styles.textBold}
					uppercase>
					Whip Up Another
				</Button>
			</Card.Content>
		</Card>
	);

	const allSlides = [...directionsSlide, returnSlide];

	return (
		<>
			<View style={[Styles.flex_1, Styles.centered_view]}>
				<Swiper
					overScrollMode='never'
					showsButtons={true}
					loop={false}
					activeDotColor={colors.primary}
					dotColor={colors.surfaceDisabled}
					activeDotStyle={{ transform: [{ scale: 1.3 }] }}
					nextButton={<IconButton icon='chevron-right' iconColor={colors.onSurface} />}
					prevButton={<IconButton icon='chevron-left' iconColor={colors.onSurface} />}>
					{allSlides.map((slide, index) => (
						<React.Fragment key={`slide-wrapper-${index}`}>{slide}</React.Fragment>
					))}
				</Swiper>
			</View>
			<TimerSheet
				isVisible={timerVisible}
				onClose={() => setTimerVisibility(false)}
				totalSeconds={totalSeconds}
			/>
		</>
	);
};

export default DirectionsSlide;
