import { FormField } from 'types/form';

export interface Mortality {
	mortality: number,
	culling: number,
}

export type MortalityFormFields = FormField<keyof Mortality>[];

export const mortalityFormFields: MortalityFormFields = [
	{ name: 'mortality', type: 'float' },
	{ name: 'culling', type: 'float' },
];
