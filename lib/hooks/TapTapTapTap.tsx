import { useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';
import { ToastAndroid } from 'react-native';

const useTapSequenceHandler = (timeThreshold = 1000) => {
	const router = useRouter();
	const tapsRef = useRef<string[]>([]);
	const lastTapTime = useRef(0);

	const expectedSequence = ['top', 'top', 'bottom', 'bottom'];

	const handleTap = useCallback(
		(position: 'top' | 'bottom') => {
			const currentTime = Date.now();

			// Check if the tap is within the time threshold
			if (currentTime - lastTapTime.current > timeThreshold) {
				// Reset sequence if too much time has passed
				tapsRef.current = [position];
			} else {
				// Add new tap to sequence
				tapsRef.current = [...tapsRef.current, position];

				// Check if sequence matches and is complete
				if (tapsRef.current.length === expectedSequence.length) {
					const isMatch = tapsRef.current.every(
						(tap, index) => tap === expectedSequence[index]
					);

					if (isMatch) {
						ToastAndroid.show('😉', ToastAndroid.SHORT);
						// router.push({ pathname: '(stack)/API' });
					}

					// Reset sequence regardless of match
					tapsRef.current = [];
				}
			}

			// Update last tap time
			lastTapTime.current = currentTime;
		},
		[timeThreshold]
	);

	return handleTap;
};

export default useTapSequenceHandler;
