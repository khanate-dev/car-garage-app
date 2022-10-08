import { ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Text, useStyleSheet, useTheme } from '@ui-kitten/components';

import { useCurrentPage } from 'contexts/dashboard';

import { getGradientByIndex } from 'helpers/color';

import Table, { TableColumn, TableRow } from 'components/data/Table';
import ScreenWrapper from 'components/layout/ScreenWrapper';
import ErrorPage from 'components/layout/ErrorPage';
import Progress from 'components/feedback/Progress';

import { DashboardNavigation } from 'screens/Dashboard';

import weightFormStyles from './BookSales.styles';

type ColumnName = 'bookedWeight' | 'pendingWeight';

const tableColumns: TableColumn<ColumnName>[] = [
	{ name: 'bookedWeight', label: 'Total KG\'s Booked' },
	{ name: 'pendingWeight', label: 'Total KG\'s Pending' },
];

const BookSales = () => {

	const theme = useTheme();
	const { currentPage, setCurrentPage } = useCurrentPage();
	const navigation = useNavigation<DashboardNavigation<'ShedForm'>>();
	const styles = useStyleSheet(weightFormStyles);

	if (
		!currentPage
		|| currentPage.name !== 'bookSales'
	) {
		if (currentPage?.name === 'contract') return null;
		return (
			<ErrorPage
				title='Book Sales'
				onBack={() => navigation.goBack()}
			/>
		);
	}

	const { shed } = currentPage;
	const contracts = shed.contracts;

	const totalWeight = contracts?.reduce(
		(sum, contract) => sum + (contract?.availableQuantity ?? 0), 0
	) ?? 0;
	const bookedWeight = contracts?.reduce(
		(sum, contract) => sum + (contract?.bookedQuantity ?? 0), 0
	) ?? 0;
	const pendingWeight = totalWeight - bookedWeight;

	const summary: TableRow<ColumnName>[] = [{
		bookedWeight,
		pendingWeight,
	}];

	return (
		<ScreenWrapper
			containerStyle={styles.container}
			title='Book Sales'
			onBack={() => navigation.goBack()}
		>

			<Table
				styles={{
					table: styles.summaryTable,
					container: styles.summaryContainer,
				}}
				columns={tableColumns}
				data={summary}
				emptyLabel='Nothing'
			/>

			<ScrollView
				style={styles.contracts}
			>
				{contracts?.map((contract, index) =>
					<TouchableOpacity
						style={styles.contractContainer}
						key={contract.contractId}
						onPress={() => {
							setCurrentPage({
								name: 'contract',
								shed,
								contract,
							});
							navigation.navigate('ShedForm');
						}}
						activeOpacity={0.5}
					>
						<LinearGradient
							style={styles.contract}
							colors={getGradientByIndex(index) ?? []}
							start={{ x: 0, y: 1 }}
							end={{ x: 1, y: 1 }}
						>
							<Text
								style={styles.contractLabel}
							>
								{contract.name}
							</Text>
							<Progress
								completed={contract.bookedQuantity / contract.availableQuantity * 100}
								size={55}
								backgroundColor={theme['color-basic-300']}
								foregroundColor={theme['color-basic-700']}
								labelColor={theme['color-basic-700']}
							/>
						</LinearGradient>
					</TouchableOpacity>
				)}
			</ScrollView>

		</ScreenWrapper>
	);

};

export default BookSales;
