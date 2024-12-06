import React, { createContext, useContext, useState } from 'react';

interface APIContextType {
	apiAddr: string;
	setAPIAddr: (newUrl: string) => void;
}

interface APIProviderProps {
	children: React.ReactNode;
}

const APIContext = createContext<APIContextType | undefined>(undefined);

const DEFAULT_API_ADDR = 'http://192.168.1.234:8080';

export const APIProvider = ({ children }: APIProviderProps) => {
	const [apiAddr, setAPIAddr] = useState<string>(DEFAULT_API_ADDR);

	const handleSetAPIAddr = (newUrl: string): void => {
		setAPIAddr(newUrl);
	};

	const value = {
		apiAddr,
		setAPIAddr: handleSetAPIAddr,
	};

	return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
};

export const useAPI = (): APIContextType => {
	const context = useContext(APIContext);
	if (!context) {
		throw new Error('useAPI must be used within an APIProvider');
	}
	return context;
};
