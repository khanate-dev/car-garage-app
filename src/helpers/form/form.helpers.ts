import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { Keyboard } from 'react-native';
import { Datepicker, Input } from '@ui-kitten/components';

import { isDate } from 'helpers/date';

import { FormFieldWithValues, FormState } from 'types/form';
import { FormInputProps } from 'components/form/FormInput';

interface Validation {
	pattern?: RegExp,
	getValidation?: (value: any) => boolean,
	message: string,
}

interface RegExValidation extends Validation {
	pattern: RegExp,
}
interface FunctionValidation extends Validation {
	getValidation: (value: any) => boolean,
}

type Validations = Record<
	FormInputProps['type'],
	RegExValidation | FunctionValidation
>;

const validations: Validations = {
	string: {
		getValidation: (value) => typeof value === 'string',
		message: 'Must Be Valid Text Value',
	},
	email: {
		pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
		message: 'Email Address Is Not Valid',
	},
	password: {
		pattern: /.{4}/,
		message: 'Password Must Be At Least 4 Characters',
	},
	int: {
		pattern: /[0-9]+/,
		message: 'Must Be A Valid Integer',
	},
	float: {
		pattern: /^[0-9]+([,.][0-9]+)?$/,
		message: 'Must Be A Valid Decimal Number',
	},
	phone: {
		pattern: /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
		message: 'Phone Number Is Invalid',
	},
	search: {
		getValidation: (value) => typeof value === 'string',
		message: 'Search Must Be Valid Text',
	},
	date: {
		getValidation: (value) => isDate(value),
		message: 'Must Be A Valid Date',
	},
};

const getInvalidState = <
	Key extends string = string,
	State extends FormState<Key> = FormState<Key>,
	>(
		form: FormFieldWithValues<Key>[]
	): null | Partial<State> => {

	const invalidState: Partial<FormState<Key>> = {};
	let isFormInvalid = false;

	for (const field of form) {

		let error: string = '';
		const trimmedValue = (
			field.name !== 'password'
				? field.value.trim()
				: field.value
		);

		const isNull = !trimmedValue;

		if (!isNull) {
			const { pattern, getValidation, message } = validations[field.type];
			const isValid = (
				pattern?.test(trimmedValue)
				?? getValidation?.(trimmedValue)
				?? true
			);
			if (!isValid) error = message;
		}
		else if (!field.canBeNull) {
			error = 'Can Not Be Empty!';
		}

		if (error) {
			isFormInvalid = true;
			invalidState[field.name] = {
				value: field.value,
				error,
			};
		}

	}

	return (
		isFormInvalid
			? invalidState as Partial<State>
			: null
	);

};

const handleFormChange = <Key extends string>(
	setForm: Dispatch<SetStateAction<FormState<Key>>>,
	key: Key,
	value: string
) => {
	setForm(prevForm => ({
		...prevForm,
		[key]: { value },
	}));
};

const isDatepicker = (
	ref: Input | Datepicker
): ref is Datepicker => (
	Boolean((ref as Datepicker).hide)
);

const handleFormFocusNext = (
	formRefs: MutableRefObject<(null | Input | Datepicker)[]>,
	index: number
) => {
	const nextField = formRefs.current?.[index + 1];
	if (!nextField) return;
	nextField.focus();
	isDatepicker(nextField) && Keyboard.dismiss();
};

export {
	getInvalidState,
	handleFormChange,
	handleFormFocusNext,
};
