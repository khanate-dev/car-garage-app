import { FormField } from 'types/form';

export interface CleanOutDetail {
	name: string,
	doseRate: number,
	contactTime: string,
	entryTime: string,
}

export type CleanOutDetailFormFields = FormField<keyof CleanOutDetail>[];

export const cleanOutDetailFormFields: CleanOutDetailFormFields = [
	{ name: 'name', type: 'string' },
	{ name: 'doseRate', type: 'float' },
	{ name: 'contactTime', type: 'string' },
	{ name: 'entryTime', type: 'date' },
];

export const cleanOutSteps = [
	'surfactant',
	'disinfectant',
	'drinkingLine',
	'fumigant',
] as const;

export type CleanOutStep = typeof cleanOutSteps[number];

export type CleanOut = Partial<Record<
	CleanOutStep,
	CleanOutDetail
>>;
