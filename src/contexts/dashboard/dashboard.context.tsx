import { createContext, useContext } from 'react';

import {
	DashboardProviderProps,
	ShedListContext as ShedListContextType,
	CurrentFormContext as CurrentFormContextType,
} from './dashboard.context.types';

const ShedListContext = createContext<ShedListContextType>({
	sheds: [],
	setSheds: () => false,
});

const CurrentFormContext = createContext<CurrentFormContextType>({
	currentPage: null,
	setCurrentPage: () => false,
});

const useShedList = () => {
	const context = useContext(ShedListContext);
	if (!context) {
		throw new Error('useShedListContext must be used within an DashboardProvider');
	}
	return context;
};

const useCurrentPage = () => {
	const context = useContext(CurrentFormContext);
	if (!context) {
		throw new Error('useCurrentFormContext must be used within an DashboardProvider');
	}
	return context;
};

const DashboardProvider = ({
	children,
	sheds,
	setSheds,
	currentPage,
	setCurrentPage,
}: DashboardProviderProps) => (
	<ShedListContext.Provider
		value={{ sheds, setSheds }}
	>
		<CurrentFormContext.Provider
			value={{ currentPage, setCurrentPage }}
		>
			{children}
		</CurrentFormContext.Provider>
	</ShedListContext.Provider>
);

export {
	DashboardProvider,
	useShedList,
	useCurrentPage,
};
