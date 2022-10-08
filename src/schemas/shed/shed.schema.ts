import {
	isModelObject,
	assertModelObject,
	assertModelObjectArray,
	isModelObjectArray,
} from 'helpers/type';

import { CleanOut, cleanOutSteps } from 'schemas/clean-out';
import { Flock } from 'schemas/flock';
import { Mortality } from 'schemas/mortality';
import { Fcr } from 'schemas/fcr';
import { Weight } from 'schemas/weight';
import { Contract } from 'schemas/contract';

import { AssertFunction, Gradient } from 'types/general';

export interface Shed {
	shedId: number,
	name: string,
	cleanOut?: CleanOut,
	flock?: Flock,
	mortality?: Mortality,
	fcr?: Fcr,
	weight?: Weight[],
	isSelling?: boolean,
	contracts?: Contract[],
}

export const requiredShedFields = [
	'shedId',
	'name',
] as (keyof Shed)[];

export interface ShedWithGradient extends Shed {
	gradient: Gradient,
}

export const isShed = (value: any): value is Shed => (
	isModelObject(value, requiredShedFields)
);

export const assertShed: AssertFunction<Shed> = (value) => (
	assertModelObject(
		value,
		requiredShedFields,
		'Shed'
	)
);

export const isShedArray = (value: any): value is Shed[] => (
	isModelObjectArray(value, requiredShedFields)
);

export const assertShedArray: AssertFunction<Shed[]> = (value) => (
	assertModelObjectArray(value, requiredShedFields, 'Shed')
);

export const shedModals = [
	'mortality',
	'fcr',
	'weight',
] as const;
export type ShedModal = typeof shedModals[number];

export const shedFormSteps = [
	...cleanOutSteps,
	'addFlock',
	'contract',
] as const;
export type ShedFormStep = typeof shedFormSteps[number];
