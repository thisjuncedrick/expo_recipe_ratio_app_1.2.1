import { useState } from 'react';

export function usePreventMultipleClicks<T>(
	action: (args: T) => void,
	delay: number = 300 // Optional delay time to prevent spamming
): [(args: T) => void, boolean] {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = (args: T) => {
		if (isClicked) return; // Do nothing if already clicked

		setIsClicked(true); // Disable click
		action(args); // Execute the action

		setTimeout(() => {
			setIsClicked(false); // Re-enable click after the delay
		}, delay);
	};

	return [handleClick, isClicked];
}
