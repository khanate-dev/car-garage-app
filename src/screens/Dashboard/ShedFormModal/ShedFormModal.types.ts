import { ModalProps } from '@ui-kitten/components';

import { Shed, ShedModal } from 'schemas/shed';
import { Weight } from 'schemas/weight';

interface ShedFormModalGenericProps extends ModalProps {
	name: ShedModal,
	shed?: Shed,
	onClose: (newWeight?: Weight) => void,
}

interface ShedWeightFormModal extends ShedFormModalGenericProps {
	name: 'weight',
	shed?: undefined,
	onClose: (newWeight?: Weight) => void,
}

interface ShedNonWeightFormModalModal extends ShedFormModalGenericProps {
	name: Exclude<ShedModal, 'weight'>,
	shed: Shed,
	onClose: () => void,
}

export type ShedFormModalProps = (
	| ShedWeightFormModal
	| ShedNonWeightFormModalModal
);
