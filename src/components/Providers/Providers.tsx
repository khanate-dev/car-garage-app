import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { AppStateProvider } from 'contexts/app-state';

import theme from 'styles/theme';

import { ProvidersProps } from './Providers.types';

const Providers = ({
	children,
	user,
	setUser,
	setAlert,
	isDarkMode,
	setIsDarkMode,
	isLoading,
	setIsLoading,
}: ProvidersProps) => (
	<NavigationContainer>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider
			{...eva}
			theme={{
				...eva[isDarkMode ? 'dark' : 'light'],
				...theme,
			}}
		>
			<AppStateProvider {...{
				user,
				setUser,
				setAlert,
				isDarkMode,
				setIsDarkMode,
				isLoading,
				setIsLoading,
			}}>
				{children}
			</AppStateProvider>
		</ApplicationProvider>
	</NavigationContainer>
);

export default Providers;
