import { Styles } from '@/lib/ui';
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { TextStyle, View } from 'react-native';
import { Dialog, Icon, Portal, Text } from 'react-native-paper';

const ConnectionInterrupt = () => {
	const [isConnected, setIsConnected] = useState(true); // Assume user is online

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected === true);
		});

		return () => unsubscribe();
	}, []);

	return (
		<Portal>
			<Dialog visible={!isConnected} dismissable={false} dismissableBackButton={false}>
				<Dialog.Content>
					<View style={[Styles.p_md, Styles.centered_view]}>
						<Icon source='wifi-off' size={50} />
						<Text style={[Styles.textCenter, Styles.mt_md as TextStyle]}>
							No Internet Connection detected. Please check your connection and try again
						</Text>
					</View>
				</Dialog.Content>
			</Dialog>
		</Portal>
	);
};

export default ConnectionInterrupt;
