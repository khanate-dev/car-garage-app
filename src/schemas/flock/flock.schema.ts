import { FormField } from 'types/form';

export interface Flock {
	date: string,
	totalChicks: number,
	chickCompany: string,
	chickQuality: string,
	transportMortality: number,
}

export type FlockFormFields = FormField<keyof Flock>[];

export const flockFormFields: FlockFormFields = [
	{ name: 'date', type: 'date' },
	{ name: 'totalChicks', type: 'int' },
	{ name: 'chickCompany', type: 'string' },
	{ name: 'chickQuality', type: 'string' },
	{ name: 'transportMortality', type: 'float' },
];
