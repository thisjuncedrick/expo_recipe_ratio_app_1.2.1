import { useRecipeIngredients } from '@/lib/api';
import {
	ConnectionInterrupt,
	Container,
	ErrorDialog,
	LoadingDialog,
	RefreshableView,
} from '@/lib/components';
import { Styles } from '@/lib/ui';
import { extractYouTubeId } from '@/lib/utils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, TextStyle, View } from 'react-native';
import { Button, Divider, Text, useTheme } from 'react-native-paper';
import YoutubeIframe, { getYoutubeMeta } from 'react-native-youtube-iframe';

const { width, height } = Dimensions.get('window');
const Video = () => {
	const { recipeId, recipeName } = useLocalSearchParams<{
		recipeId: string;
		recipeName: string;
	}>();
	const router = useRouter();
	const { colors } = useTheme();

	const [videoId, setVideoId] = useState<string | null>(null);
	const [isNavigating, setNavigating] = useState<boolean>(false);
	const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
	const [videoError, setVideoError] = useState<boolean>(false);
	const [videoMeta, setVideoMeta] = useState();

	const { data, isLoading, isRefetching, refetch, isError, error } =
		useRecipeIngredients(recipeId);

	useEffect(() => {
		if (data) {
			const id = extractYouTubeId(data.video_tutorial);
			if (id) {
				setVideoId(id);
				getYoutubeMeta(id).then((meta) => setVideoMeta(meta));
			}
		}
	}, [data]);

	const handleTextGuidePress = () => {
		if (isNavigating) return;

		setNavigating(true);
		router.replace({ pathname: '/Text', params: { recipeId: recipeId, recipeName: recipeName } });

		setTimeout(() => setNavigating(false), 1000);
	};

	return (
		<>
			<LoadingDialog visible={isLoading || isVideoLoading} />
			<ErrorDialog visible={isError} errorMessage={error?.message} onRetry={refetch} />
			<ConnectionInterrupt />
			<Container>
				{data ? (
					<RefreshableView onRefresh={refetch} isRefetching={isRefetching}>
						{!videoError ? (
							<>
								{videoId ? (
									<YoutubeIframe
										height={height / 3.5}
										contentScale={1}
										width={width}
										videoId={videoId}
										onReady={() => setIsVideoLoading(false)}
										onError={() => {
											setIsVideoLoading(false);
											setVideoError(true);
										}}
									/>
								) : null}
							</>
						) : (
							<>
								<View style={[Styles.centered_view, { height: height / 3.5 }]}>
									<Text
										variant='titleMedium'
										style={[
											Styles.textCenter,
											Styles.mb_md as TextStyle,
											{ color: colors.error },
										]}>
										Video not available
									</Text>
									<Button mode='outlined' onPress={handleTextGuidePress}>
										Try our Text Guide
									</Button>
								</View>
								<Divider />
							</>
						)}

						<View style={Styles.p_md}>
							<Text
								variant='titleLarge'
								numberOfLines={2}
								style={[Styles.textBold, { color: colors.primary }]}>
								{data.name.toUpperCase()}
							</Text>
							{videoMeta ? (
								<>
									<Text
										variant='titleSmall'
										style={[
											Styles.mt_sm as TextStyle,
											Styles.textBold,
											Styles.textItalic,
											{ color: colors.secondary },
										]}>
										{videoMeta.title}
									</Text>
									<Text>by {videoMeta.author_name}</Text>
								</>
							) : null}
							<Divider style={Styles.mv_sm} bold={true} />
							<Text style={[{ textAlign: 'justify' }, Styles.mb_md as TextStyle]}>
								{data.description}
							</Text>

							{/* <View style={Styles.p_lg}>
								
							</View> */}
						</View>
					</RefreshableView>
				) : null}
			</Container>
		</>
	);
};

export default Video;
