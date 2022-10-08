import { DatepickerProps } from '@ui-kitten/components';

import { FormFieldState } from 'types/form';

export interface FormDatePickerProps extends Omit<DatepickerProps, 'onChange'> {
	state: FormFieldState,
	onChange: (date: string) => void,
	hasIcon?: boolean,
	noCaption?: boolean,
	noMargin?: boolean,
}
