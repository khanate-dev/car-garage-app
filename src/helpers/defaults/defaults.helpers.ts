import { shouldAutoFill } from 'config/react';

import { FormField, FormState } from 'types/form';

const formDefaults: Record<FormField<string>['type'], string> = {
	string: 'test',
	int: '25',
	float: '25.255',
	date: '2022-10-20T10:20:00.000Z',
	email: 'testing@test.com',
	password: '12345',
	phone: '090078601',
	search: '',
};

const getDefaultFormState = <Key extends string = string>(
	fields: FormField<Key>[],
	existing?: Record<Key, string>
): FormState<Key> => fields.reduce(
	(object, field) => ({
		...object,
		[field.name]: {
			value: (
				existing?.[field.name].toString()
				?? (
					shouldAutoFill
						? formDefaults[field.type]
						: ''
				)
			),
		},
	})
	, {} as FormState<Key>
);

export {
	formDefaults,
	getDefaultFormState,
};
