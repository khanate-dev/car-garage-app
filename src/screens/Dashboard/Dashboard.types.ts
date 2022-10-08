import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Shed, ShedFormStep } from 'schemas/shed';
import { Contract } from 'schemas/contract';

export type DashboardNavigationPages = {
	ShedView: undefined,
	ShedForm: undefined,
	WeightForm: undefined,
	BookSales: undefined,
};

export type DashboardNavigation<
	Page extends keyof DashboardNavigationPages
	> = NativeStackNavigationProp<
		DashboardNavigationPages,
		Page
	>;

export interface CurrentPage {
	name: ShedFormStep | 'weightForm' | 'bookSales',
	shed: Shed,
	contract?: Contract,
}
