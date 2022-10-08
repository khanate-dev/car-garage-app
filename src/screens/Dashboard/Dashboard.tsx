import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DashboardProvider } from 'contexts/dashboard';

import { ShedWithGradient } from 'schemas/shed';

import ShedForm from './ShedForm';
import ShedView from './ShedView';
import WeightForm from './WeightForm';
import BookSales from './BookSales';

import { CurrentPage, DashboardNavigationPages } from './Dashboard.types';

const dashboardStack = createNativeStackNavigator<DashboardNavigationPages>();

const Dashboard = () => {

	const [sheds, setSheds] = useState<ShedWithGradient[]>([]);
	const [currentPage, setCurrentPage] = useState<null | CurrentPage>(null);

	return (
		<DashboardProvider {...{
			sheds,
			setSheds,
			currentPage,
			setCurrentPage,
		}}>
			<dashboardStack.Navigator
				initialRouteName='ShedView'
				screenOptions={{ headerShown: false }}
			>
				<dashboardStack.Screen name='ShedView' component={ShedView} />
				<dashboardStack.Screen name='ShedForm' component={ShedForm} />
				<dashboardStack.Screen name='WeightForm' component={WeightForm} />
				<dashboardStack.Screen name='BookSales' component={BookSales} />
			</dashboardStack.Navigator>
		</DashboardProvider>
	);

};

export default Dashboard;
