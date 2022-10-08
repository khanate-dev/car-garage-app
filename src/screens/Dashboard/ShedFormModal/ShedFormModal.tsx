import { useState } from 'react';
import { Modal, Text, useStyleSheet } from '@ui-kitten/components';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

import { useShedList } from 'contexts/dashboard';

import { getDefaultFormState } from 'helpers/defaults';

import { mortalityFormFields } from 'schemas/mortality';
import { fcrFormFields } from 'schemas/fcr';
import { Weight, weightFormFields } from 'schemas/weight';

import FormContainer from 'components/form/FormContainer';

import { ShedFormModalProps } from './ShedFormModal.types';
import shedFormModalStyles from './ShedFormModal.styles';

const fieldsMapping = {
	mortality: mortalityFormFields,
	fcr: fcrFormFields,
	weight: weightFormFields,
};

const ShedFormModal = ({
	name,
	shed,
	onClose,
	...modalProps
}: ShedFormModalProps) => {

	const { setSheds } = useShedList();
	const styles = useStyleSheet(shedFormModalStyles);

	const [form, setForm] = useState(
		getDefaultFormState(
			fieldsMapping[name],
			shed?.[name] as any
		)
	);

	const handleClose = (isSubmit?: boolean) => {

		if (!isSubmit) {
			onClose();
			return;
		}

		if (name === 'weight') {
			const weight: Weight = {
				batchSize: parseInt(form.batchSize.value),
				batchWeight: parseFloat(form.batchWeight.value),
			};
			onClose(weight);
			return;
		}

		setSheds(prevSheds => prevSheds.map(row => {

			if (row.shedId !== shed.shedId) return row;

			if (name === 'mortality') {
				row.mortality = {
					mortality: parseFloat(form.mortality.value),
					culling: parseFloat(form.culling.value),
				};
			}
			else if (name === 'fcr') {
				row.fcr = {
					bags: parseInt(form.bags.value),
					feed: form.feed.value.trim(),
				};
			}

			return row;

		}));

		onClose();

	};

	return (
		<Modal
			{...modalProps}
			backdropStyle={styles.backdrop}
			onBackdropPress={() => handleClose(false)}
			visible
		>
			<Animated.View
				style={styles.modal}
				entering={SlideInDown}
				exiting={SlideOutDown}
			>

				<Text style={styles.heading}>
					{name === 'fcr' ? 'FCR' : `${name[0]?.toUpperCase()}${name.slice(1)}`}
				</Text>

				<FormContainer
					form={form}
					setForm={setForm}
					formFields={fieldsMapping[name]}
					submitLabel='Update'
					onSubmit={() => handleClose(true)}
					submitProps={{
						status: 'danger',
					}}
				/>

			</Animated.View>
		</Modal>
	);

};

export default ShedFormModal;
