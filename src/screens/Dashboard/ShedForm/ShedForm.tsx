import { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, useStyleSheet } from '@ui-kitten/components';

import { useCurrentPage, useShedList } from 'contexts/dashboard';

import { humanizeString } from 'helpers/string';
import { getDefaultFormState } from 'helpers/defaults';

import {
	cleanOutSteps,
	CleanOutDetail,
	cleanOutDetailFormFields,
} from 'schemas/clean-out';
import { flockFormFields, Flock } from 'schemas/flock';
import { contractFormFields, Contract } from 'schemas/contract';

import ScreenWrapper from 'components/layout/ScreenWrapper';
import FormContainer from 'components/form/FormContainer';
import ErrorPage from 'components/layout/ErrorPage';

import { FormState } from 'types/form';
import { DashboardNavigation, CurrentPage } from 'screens/Dashboard';

import shedFormStyles from './ShedForm.styles';

const fieldsMapping = {
	surfactant: cleanOutDetailFormFields,
	disinfectant: cleanOutDetailFormFields,
	drinkingLine: cleanOutDetailFormFields,
	fumigant: cleanOutDetailFormFields,
	addFlock: flockFormFields,
	contract: contractFormFields,
};

type CleanOutForm = FormState<keyof CleanOutDetail>;
type FlockForm = FormState<keyof Flock>;
type ContractForm = FormState<keyof Contract>;
type Form = (
	| undefined
	| CleanOutForm
	| FlockForm
	| ContractForm
);

const getInitialForm = (form: null | CurrentPage): Form => {
	if (
		!form
		|| form.name === 'weightForm'
		|| form.name === 'bookSales'
		|| (form.name === 'contract' && !form.contract)
	) return undefined;
	if (form.name === 'contract') {
		return getDefaultFormState(
			fieldsMapping.contract,
			form.contract as any
		);
	}
	return getDefaultFormState(fieldsMapping[form.name]);
};

const ShedForm = () => {

	const styles = useStyleSheet(shedFormStyles);
	const { setSheds } = useShedList();
	const { currentPage, setCurrentPage } = useCurrentPage();
	const navigation = useNavigation<DashboardNavigation<'ShedForm'>>();

	const [form, setForm] = useState<Form>(getInitialForm(currentPage));

	const pageTitle = humanizeString(currentPage?.name ?? 'ShedForm');

	if (
		!currentPage
		|| currentPage.name === 'weightForm'
		|| currentPage.name === 'bookSales'
		|| (currentPage.name === 'contract' && !currentPage.contract)
		|| !form
	) {
		return (
			<ErrorPage
				title={pageTitle}
				onBack={() => navigation.goBack()}
			/>
		);
	}

	const handleClose = (isSubmit?: boolean) => {

		const { name, shed, contract } = currentPage;

		if (name === 'contract') {
			setCurrentPage({
				name: 'bookSales',
				shed,
			});
		}

		if (!isSubmit || !form) {
			navigation.goBack();
			return;
		}

		setSheds(prevSheds => prevSheds.map(row => {

			if (row.shedId !== shed.shedId) return row;

			if (cleanOutSteps.includes(name as any)) {

				const {
					name,
					doseRate,
					contactTime,
					entryTime,
				} = form as CleanOutForm;

				row.cleanOut = {
					...row.cleanOut,
					[currentPage.name]: {
						name: name.value.trim(),
						doseRate: parseFloat(doseRate.value),
						contactTime: contactTime.value.trim(),
						entryTime: entryTime.value.trim(),
					} as CleanOutDetail,
				};
			}
			else if (name === 'addFlock') {

				const {
					date,
					totalChicks,
					chickCompany,
					chickQuality,
					transportMortality,
				} = form as FlockForm;

				row.flock = {
					date: date.value.trim(),
					totalChicks: parseInt(totalChicks.value),
					chickCompany: chickCompany.value.trim(),
					chickQuality: chickQuality.value.trim(),
					transportMortality: parseFloat(transportMortality.value),
				};
			}
			else if (name === 'contract') {

				if (!row.contracts || !contract) return row;
				const {
					truckNo,
					bookedQuantity,
				} = form as ContractForm;

				row.contracts = row.contracts.map(current =>
					current.contractId === contract.contractId
						? {
							...current,
							truckNo: truckNo.value.trim(),
							bookedQuantity: parseFloat(bookedQuantity.value),
						}
						: current
				);
			}

			return row;

		}));

		navigation.goBack();

	};

	const formFields = fieldsMapping[currentPage.name];

	return (
		<ScreenWrapper
			containerStyle={styles.container}
			title={pageTitle}
			onBack={() => handleClose(false)}
		>

			{currentPage.contract &&
				<>
					<Text style={styles.heading}>
						{currentPage.contract.name}
					</Text>

					<View
						style={styles.summaryContainer}
					>
						<View
							style={[
								styles.summary,
								styles.dangerSummary,
							]}
						>
							<Text
								style={[
									styles.summaryLabel,
									styles.dangerSummaryLabel,
								]}
							>
								Total Weight (KGs)
							</Text>
							<Text
								style={[
									styles.summaryValue,
									styles.dangerSummaryValue,
								]}
							>
								{currentPage.contract.availableQuantity}
							</Text>
						</View>

						<View
							style={[
								styles.summary,
								styles.successSummary,
							]}
						>
							<Text
								style={[
									styles.summaryLabel,
									styles.successSummaryLabel,
								]}
							>
								Pending Weight (KGs)
							</Text>
							<Text
								style={[
									styles.summaryValue,
									styles.successSummaryValue,
								]}
							>
								{(currentPage.contract.availableQuantity) - (parseInt((form as ContractForm).bookedQuantity.value) || 0)}
							</Text>
						</View>
					</View>

				</>
			}

			<FormContainer
				form={form as any}
				setForm={setForm as any}
				formFields={formFields}
				submitLabel='Update'
				onSubmit={() => handleClose(true)}
			/>

		</ScreenWrapper>
	);

};

export default ShedForm;
