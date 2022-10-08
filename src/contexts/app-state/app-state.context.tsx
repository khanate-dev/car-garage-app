import { createContext, useContext } from 'react';

import { removeUserSetting, setUserSetting } from 'helpers/settings';
import { LoggedInUser } from 'schemas/user';

import { AppStateProviderProps } from './app-state.context.types';

const UserContext = createContext<AppStateProviderProps['user']>(null);
const UpdateUserContext = createContext<AppStateProviderProps['setUser']>(() => false);
const SetAlertContext = createContext<AppStateProviderProps['setAlert']>(() => false);
const DarkModeContext = createContext<AppStateProviderProps['isDarkMode']>(false);
const UpdateDarkModeContext = createContext<AppStateProviderProps['setIsDarkMode']>(() => false);
const LoadingContext = createContext<AppStateProviderProps['isLoading']>(false);
const SetLoadingContext = createContext<AppStateProviderProps['setIsLoading']>(() => false);

const useUser = () => {
	const user = useContext(UserContext);
	if (user === undefined) {
		throw new Error('useUser must be used within an AppStateProvider');
	}
	return user;
};

const useUpdateUser = () => {
	const setUser = useContext(UpdateUserContext);
	if (!setUser) {
		throw new Error('useUpdateUser must be used within an AppStateProvider');
	}
	return (user: null | LoggedInUser) => {
		if (user) {
			setUserSetting('user', user);
		}
		else {
			removeUserSetting('user');
		}
		setUser(user);
	};
};

const useSetAlert = () => {
	const setAlert = useContext(SetAlertContext);
	if (!setAlert) {
		throw new Error('useSetAlert must be used within an AppStateProvider');
	}
	return setAlert;
};

const useDarkMode = () => {
	const isDarkMode = useContext(DarkModeContext);
	if (isDarkMode === undefined) {
		throw new Error('useDarkMode must be used within an AppStateProvider');
	}
	return isDarkMode;
};

const useToggleDarkMode = () => {
	const setIsDarkMode = useContext(UpdateDarkModeContext);
	if (setIsDarkMode === undefined) {
		throw new Error('useToggleDarkMode must be used within an AppStateProvider');
	}
	return () => {
		setIsDarkMode(prevIsDarkMode => {
			setUserSetting('isDarkMode', !prevIsDarkMode);
			return !prevIsDarkMode;
		});
	};
};

const useUpdateDarkMode = () => {
	const setIsDarkMode = useContext(UpdateDarkModeContext);
	if (setIsDarkMode === undefined) {
		throw new Error('useSetDarkMode must be used within an AppStateProvider');
	}
	return (isDarkMode: boolean) => {
		setUserSetting('isDarkMode', isDarkMode);
		setIsDarkMode(isDarkMode);
	};
};

const useLoading = () => {
	const isLoading = useContext(LoadingContext);
	if (isLoading === undefined) {
		throw new Error('useLoading must be used within an AppStateProvider');
	}
	return isLoading;
};

const useSetLoading = () => {
	const setIsLoading = useContext(SetLoadingContext);
	if (!setIsLoading) {
		throw new Error('useSetLoading must be used within an AppStateProvider');
	}
	return setIsLoading;
};

const AppStateProvider = ({
	children,
	user,
	setUser,
	setAlert,
	isDarkMode,
	setIsDarkMode,
	isLoading,
	setIsLoading,
}: AppStateProviderProps) => {

	return (
		<UserContext.Provider value={user}>
			<UpdateUserContext.Provider value={setUser}>
				<SetAlertContext.Provider value={setAlert}>
					<DarkModeContext.Provider value={isDarkMode}>
						<UpdateDarkModeContext.Provider value={setIsDarkMode}>
							<LoadingContext.Provider value={isLoading}>
								<SetLoadingContext.Provider value={setIsLoading}>
									{children}
								</SetLoadingContext.Provider>
							</LoadingContext.Provider>
						</UpdateDarkModeContext.Provider>
					</DarkModeContext.Provider>
				</SetAlertContext.Provider>
			</UpdateUserContext.Provider>
		</UserContext.Provider>
	);

};

export {
	AppStateProvider,
	useUser,
	useUpdateUser,
	useSetAlert,
	useDarkMode,
	useToggleDarkMode,
	useUpdateDarkMode,
	useLoading,
	useSetLoading,
};
