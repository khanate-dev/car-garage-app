import { Dispatch, ReactNode, SetStateAction } from 'react';

import { ShedWithGradient } from 'schemas/shed';

import { CurrentPage } from 'screens/Dashboard';

export interface ShedListContext {
	sheds: ShedWithGradient[],
	setSheds: Dispatch<SetStateAction<ShedWithGradient[]>>,
}

export interface CurrentFormContext {
	currentPage: null | CurrentPage,
	setCurrentPage: Dispatch<SetStateAction<null | CurrentPage>>,
}

export interface DashboardProviderProps extends ShedListContext, CurrentFormContext {
	children: ReactNode,
}
