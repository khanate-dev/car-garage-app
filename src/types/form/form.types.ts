import { FormInputProps } from 'components/form/FormInput';

export interface FormFieldState {
	value: string,
	error?: string,
}

export type FormState<Keys extends string = string> = Record<
	Keys,
	FormFieldState
>;

export interface FormField<Key extends string = string> {
	name: Key,
	type: FormInputProps['type'],
	label?: string,
	canBeNull?: boolean,
	hasIcon?: boolean,
	button?: FormInputProps['button'],
	dependsOn?: Key,
	inputProps?: Omit<
		FormInputProps,
		| 'type'
		| 'state'
		| 'onChange'
		| 'button'
		| 'isLast'
	>,
}

export interface FormFieldWithValues<Key extends string = string> extends FormField<Key> {
	value: any,
}
