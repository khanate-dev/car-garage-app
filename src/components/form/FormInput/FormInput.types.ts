import { InputProps } from '@ui-kitten/components';
import { StyleProp, ViewStyle } from 'react-native';

import { FormFieldState } from 'types/form';
import { ThemeColors } from 'types/general';
import { FormButtonProps } from '../FormButton';

type FormInputType = (
	| 'string'
	| 'int'
	| 'float'
	| 'email'
	| 'password'
	| 'phone'
	| 'search'
	| 'date'
);

export interface FormInputProps extends Omit<InputProps, 'onChange' | 'status'> {
	controlStyle?: StyleProp<ViewStyle>,
	type: FormInputType,
	state: FormFieldState,
	onChange: (value: string) => void,
	status?: ThemeColors,
	button?: FormButtonProps,
	hasIcon?: boolean,
	noCaption?: boolean,
	noMargin?: boolean,
	isLast?: boolean,
}
