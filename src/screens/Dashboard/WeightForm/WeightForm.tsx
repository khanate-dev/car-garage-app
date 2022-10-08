import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useStyleSheet } from '@ui-kitten/components';

import { isSmallerScreen } from 'config/react';
import { useCurrentPage, useShedList } from 'contexts/dashboard';

import { Weight } from 'schemas/weight';

import Table, { TableColumn, TableRow } from 'components/data/Table';
import ScreenWrapper from 'components/layout/ScreenWrapper';
import FormButton from 'components/form/FormButton';
import ErrorPage from 'components/layout/ErrorPage';

import ShedFormModal from 'screens/Dashboard/ShedFormModal';
import { DashboardNavigation } from 'screens/Dashboard';

import weightFormStyles from './WeightForm.styles';

type ColumnName = keyof Weight;

const tableColumns: TableColumn<ColumnName>[] = [
	{ name: 'batchSize', width: 2 },
	{ name: 'batchWeight', width: 2 },
];

const WeightForm = () => {

	const { setSheds } = useShedList();
	const { currentPage } = useCurrentPage();
	const navigation = useNavigation<DashboardNavigation<'ShedForm'>>();
	const styles = useStyleSheet(weightFormStyles);

	const [newWeights, setNewWeights] = useState<Weight[]>([]);
	const [isAdding, setIsAdding] = useState<boolean>(false);

	if (
		!currentPage
		|| currentPage.name !== 'weightForm'
	) {
		return (
			<ErrorPage
				title='Weight'
				onBack={() => navigation.goBack()}
			/>
		);
	}

	const { shed } = currentPage;
	const weight = shed.weight ?? [];

	const handleClose = (isSubmit?: boolean) => {

		if (!isSubmit) {
			navigation.goBack();
			return;
		}

		setSheds(prevSheds => prevSheds.map(row => {

			const { shed } = currentPage;

			if (row.shedId !== shed.shedId) return row;

			row.weight = [
				...row.weight ?? [],
				...newWeights,
			];

			return row;

		}));

		navigation.goBack();

	};

	const currentWeight = [...weight, ...newWeights];
	const tableRows: TableRow<ColumnName>[] = currentWeight.map(({ batchSize, batchWeight }) => ({
		batchSize: batchSize.toLocaleString(),
		batchWeight: batchWeight.toFixed(1).replace(/(\..)(.*)/g, '$1'),
	}));

	const totalSize = currentWeight.reduce(
		(sum, { batchSize }) => sum + batchSize, 0
	);
	const totalWeight = currentWeight.reduce(
		(sum, { batchWeight }) => sum + batchWeight, 0
	);

	const summary: TableRow<ColumnName> = {
		batchSize: totalSize.toLocaleString(),
		batchWeight: totalWeight.toFixed(1).replace(/(\..)(.*)/g, '$1'),
	};

	return (
		<ScreenWrapper
			containerStyle={styles.container}
			title='Weight'
			onBack={() => handleClose(false)}
		>

			<Table
				styles={{ table: styles.table }}
				columns={tableColumns}
				data={tableRows}
				emptyLabel='No Weight Entries Have Been Made'
				showRowNumbers
			/>

			<FormButton
				style={styles.addButton}
				label='Add Entry'
				status='basic'
				iconLeft='plus-circle-outline'
				borders='curved'
				size={isSmallerScreen ? 'medium' : 'large'}
				onPress={() => setIsAdding(true)}
				hasBorder
			/>

			<FormButton
				style={styles.submitButton}
				label='Update'
				status='danger'
				borders='curved'
				onPress={() => handleClose(true)}
			/>

			<Table
				styles={{
					table: styles.summaryTable,
					container: styles.summaryContainer,
				}}
				columns={tableColumns}
				data={[summary]}
				emptyLabel='No Weight Entries Have Been Made'
			/>

			{isAdding &&
				<ShedFormModal
					name='weight'
					onClose={(newWeight) => {
						newWeight && setNewWeights(prev => [
							...prev,
							newWeight,
						]);
						setIsAdding(false);
					}}
				/>
			}

		</ScreenWrapper>
	);

};

export default WeightForm;
