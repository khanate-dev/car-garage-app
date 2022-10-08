import { Dispatch, ReactNode, SetStateAction } from 'react';

import { User } from 'schemas/user';

import { AlertModalProps } from 'components/modal/AlertModal';

export interface AppStateProviderProps {
	children: ReactNode,
	user: null | User,
	setUser: Dispatch<SetStateAction<null | User>>,
	setAlert: Dispatch<SetStateAction<null | AlertModalProps>>,
	isDarkMode: boolean,
	setIsDarkMode: Dispatch<SetStateAction<boolean>>,
	isLoading: boolean,
	setIsLoading: Dispatch<SetStateAction<boolean>>,
}
