import { Dispatch, SetStateAction } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { FormField, FormState } from 'types/form';
import { AlertStatus } from 'types/general';
import { FormButtonProps } from 'components/form/FormButton';

export interface FormContainerProps<Fields extends string> {

	/** the styles to apply to the form container */
	style?: StyleProp<ViewStyle>,

	/** the form's state */
	form: FormState<Fields>,

	/** the setter function for the form state */
	setForm: Dispatch<SetStateAction<FormState<Fields>>>,

	/** the array describing the fields to show on the form */
	formFields: FormField<Fields>[],

	/** the form status state */
	status?: AlertStatus,

	/*** the setter function to change the form status */
	setStatus?: Dispatch<SetStateAction<AlertStatus>>,

	/** the function to call when the submit button is pressed */
	onSubmit: () => void,

	/** the function to call when an input's value changes */
	onInputChange?: (field: FormField<Fields>, newValue: string) => void,

	/** the label of the submit button */
	submitLabel?: string,

	/** the icon to show on the submit button */
	submitIcon?: string,

	/** the props to pass to the submit button */
	submitProps?: Partial<FormButtonProps>,

	/** should the form fields and submit button show icons? */
	hasIcons?: boolean,

	/** is the form page busy? */
	isBusy?: boolean,

	/** should the form submission be disabled? */
	disabled?: boolean,

}
