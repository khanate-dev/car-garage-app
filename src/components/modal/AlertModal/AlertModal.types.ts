import { ModalProps } from '@ui-kitten/components';

import { ThemeColors } from 'types/general';

import { FormButtonProps } from 'components/form/FormButton';

export interface AlertModalProps extends Pick<ModalProps, 'style' | 'backdropStyle'> {
	title: string,
	text: string,
	type?: Exclude<ThemeColors, 'control'>,
	closeLabel?: string,
	actions?: FormButtonProps[],
	onClose?: () => void,
	hasIcon?: boolean,
}
