import { Container, useAPI } from '@/lib/components';
import { Styles } from '@/lib/ui';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
Text;

const API = () => {
	const router = useRouter();
	const { apiAddr, setAPIAddr } = useAPI();
	const [inputValue, setInputValue] = useState(apiAddr);
	const [error, setError] = useState(false);

	const setAPI = () => {
		if (!inputValue.trim()) {
			setError(true);
			return;
		}

		setAPIAddr(inputValue.trim());
		ToastAndroid.show('Succesfully set API address for this session', ToastAndroid.SHORT);
		setError(false);
		router.back();
	};

	return (
		<Container>
			<View style={Styles.p_md}>
				<TextInput
					label='Enter API server address'
					value={inputValue}
					onChangeText={(text) => {
						setInputValue(text);
						if (error && text.trim()) setError(false);
					}}
					selectTextOnFocus={true}
					mode='outlined'
				/>
				<HelperText type='error' visible={error}>
					API Address cannot be empty.
				</HelperText>
				<Button mode='contained' onPress={setAPI} style={Styles.mt_md}>
					Save API address
				</Button>
			</View>
		</Container>
	);
};

export default API;
