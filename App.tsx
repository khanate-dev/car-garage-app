import { useState, useEffect } from 'react';
import { Appearance, DeviceEventEmitter } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';

import { environment } from 'config/react';
import useCompare from 'hooks/compare';

import { getUserSetting } from 'helpers/settings';
import { User } from 'schemas/user';

import Login from 'screens/Login';
import Dashboard from 'screens/Dashboard';

import Providers from 'components/Providers';
import AlertModal, { AlertModalProps } from 'components/modal/AlertModal';
import LoadingModal from 'components/modal/LoadingModal';

const appStack = createNativeStackNavigator();

const App = () => {

	const [user, setUser] = useState<null | User>(null);
	const [alert, setAlert] = useState<null | AlertModalProps>(null);
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const prefersDarkMode = Appearance.getColorScheme() === 'dark';
	const hasPrefersDarkModeChanged = useCompare(prefersDarkMode);

	useEffect(() => {
		(async () => {
			if (!hasPrefersDarkModeChanged) return;
			const storedPreference = await getUserSetting('isDarkMode');
			setIsDarkMode(storedPreference ?? prefersDarkMode);
		})();
	}, [prefersDarkMode, hasPrefersDarkModeChanged]);

	useEffect(() => {

		(async () => {
			const storedUser = await getUserSetting('user');
			setUser(storedUser);
		})();

		DeviceEventEmitter.addListener('invalidate-user', () => {
			setUser(null);
		});

		if (
			environment !== 'production'
			|| typeof Updates?.addListener !== 'function'
		) return;

		Updates.addListener((event) => {

			if (event.type !== Updates.UpdateEventType.UPDATE_AVAILABLE) {
				return;
			}

			setAlert({
				title: 'Update Available!',
				text: 'A New Update Is Available For The App.\nRestart The Application To Apply Updates.',
				closeLabel: 'Later',
				hasIcon: true,
				actions: [{
					label: 'Restart & Update',
					onPress: () => Updates.reloadAsync(),
				}],
			});

		});

	}, []);

	return (
		<Providers {...{
			user,
			setUser,
			setAlert,
			isDarkMode,
			setIsDarkMode,
			isLoading,
			setIsLoading,
		}}>

			<StatusBar
				style='light'
				backgroundColor='#000000'
			/>

			<appStack.Navigator
				initialRouteName='Login'
				screenOptions={{ headerShown: false }}
			>
				{!user
					? <appStack.Screen name='Login' component={Login} />
					: <appStack.Screen name='Dashboard' component={Dashboard} />
				}
			</appStack.Navigator>

			{isLoading && <LoadingModal />}

			{alert && <AlertModal {...alert} />}

		</Providers>
	);
};

export default App;
