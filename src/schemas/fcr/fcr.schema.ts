import { FormField } from 'types/form';

export interface Fcr {
	feed: string,
	bags: number,
}

export type FcrFormFields = FormField<keyof Fcr>[];

export const fcrFormFields: FcrFormFields = [
	{ name: 'feed', type: 'string' },
	{ name: 'bags', type: 'int' },
];
