import { FormField } from 'types/form';

export interface Weight {
	batchSize: number,
	batchWeight: number,
}

export type WeightFormFields = FormField<keyof Weight>[];

export const weightFormFields: WeightFormFields = [
	{ name: 'batchSize', type: 'int' },
	{ name: 'batchWeight', type: 'float' },
];
