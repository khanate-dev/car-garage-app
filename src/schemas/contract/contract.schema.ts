import { FormField } from 'types/form';

export interface Contract {
	contractId: number,
	name: string,
	truckNo: string,
	availableQuantity: number,
	bookedQuantity: number,
}

export type ContractFormFields = FormField<keyof Contract>[];

export const contractFormFields: ContractFormFields = [
	{ name: 'truckNo', type: 'string' },
	{ name: 'bookedQuantity', label: 'Booked Quantity (KGs)', type: 'float' },
];
