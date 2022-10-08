import {
	AssertArrayFunction,
	AssertFunction,
	GenericObject,
	ReadableTypeOf,
} from 'types/general';

const readableTypeOf = (
	value: any
): ReadableTypeOf => (
	typeof value !== 'object'
		? typeof value
		: value === null
			? 'null'
			: Array.isArray(value)
				? 'array'
				: 'object'
);

const isObject = (
	value: any
): value is GenericObject => (
	readableTypeOf(value) === 'object'
);

const assertObject: AssertFunction<GenericObject> = (value) => {
	const type = readableTypeOf(value);
	if (type !== 'object') {
		throw new TypeError(`Expected object, received ${type}`);
	}
};

const isString = (
	value: any
): value is string => (
	typeof value === 'string'
);

const assertString: AssertFunction<string> = (value) => {
	const type = readableTypeOf(value);
	if (type !== 'string') {
		throw new TypeError(`Expected string, received ${type}`);
	}
};

const isArrayByChecker = <Type>(
	value: any,
	checker: (value: any) => value is Type,
	onlyCheckFirst?: boolean
): value is Type[] => (
	Array.isArray(value)
	&& (
		onlyCheckFirst
			? value.length === 0 || checker(value[0])
			: value.every(element => checker(element))
	)
);

type AssertArrayByChecker = <Type>(
	value: any,
	assert: AssertFunction<Type>,
	onlyCheckFirst?: boolean
) => asserts value is Type[];

const assertArrayByChecker: AssertArrayByChecker = (
	value,
	assert,
	onlyCheckFirst
) => {
	if (!Array.isArray(value)) {
		const type = readableTypeOf(value);
		throw new TypeError(`Expected array, received ${type}`);
	}
	try {
		if (!value.length) return;
		const array = (
			onlyCheckFirst
				? value.slice(0, 1)
				: value
		);
		array.every(assert);
	}
	catch (error: any) {
		throw new TypeError(`Invalid array member. ${error.message ?? error}`);
	}
};

const isObjectArray = (
	value: any,
	onlyCheckFirst?: boolean
): value is GenericObject[] => (
	isArrayByChecker(value, isObject, onlyCheckFirst)
);

const assertObjectArray: AssertArrayFunction<GenericObject[]> = (
	value,
	onlyCheckFirst?
) => (
	assertArrayByChecker(value, assertObject, onlyCheckFirst)
);

const isStringArray = (
	value: any,
	onlyCheckFirst?: boolean
): value is string[] => (
	isArrayByChecker(value, isString, onlyCheckFirst)
);

const assertStringArray: AssertArrayFunction<string[]> = (
	value,
	onlyCheckFirst?
) => (
	assertArrayByChecker(value, assertString, onlyCheckFirst)
);

const areObjectArrays = (
	value: any,
	onlyCheckFirst?: boolean
): value is GenericObject[][] => (
	isArrayByChecker(value, isObjectArray, onlyCheckFirst)
);

const assertObjectArrays: AssertArrayFunction<GenericObject[][]> = (
	value,
	onlyCheckFirst
) => (
	assertArrayByChecker(value, assertObjectArray, onlyCheckFirst)
);

const areStringArrays = (
	value: any,
	isSingleType?: boolean
): value is string[][] => (
	isArrayByChecker(value, isStringArray, isSingleType)
);
const assertStringArrays: AssertArrayFunction<string[][]> = (
	value,
	onlyCheckFirst?
) => (
	assertArrayByChecker(value, assertStringArray, onlyCheckFirst)
);

const isModelObject = <ModelObject>(
	value: any,
	requiredFields: (keyof ModelObject)[]
): value is ModelObject => {

	if (!isObject(value)) return false;

	return requiredFields.every(field =>
		Object.prototype.hasOwnProperty.call(value, field)
	);

};

type AssertModelObject = <ModelObject>(
	value: any,
	requiredFields: (keyof ModelObject)[],
	modelName?: string
) => asserts value is ModelObject;

const assertModelObject: AssertModelObject = (
	value,
	requiredFields,
	modelName?
) => {
	try {
		assertObject(value);
		const missingFields = requiredFields.filter(field =>
			!Object.prototype.hasOwnProperty.call(value, field)
		);
		if (missingFields.length === 0) return;
		throw new TypeError(
			`Missing [${missingFields.join(', ')}]`
		);
	}
	catch (error: any) {
		throw new TypeError(
			`Invalid ${modelName ?? 'object'}! ${error.message ?? error}`
		);
	}
};

const isModelObjectArray = <ModelObject>(
	value: any,
	requiredFields: (keyof ModelObject)[]
): value is ModelObject[] => (
	Array.isArray(value)
	&& value.every(row =>
		isModelObject(row, requiredFields)
	)
);

type AssertModelObjectArray = <ModelObject>(
	value: any,
	requiredFields: (keyof ModelObject)[],
	modelName?: string
) => asserts value is ModelObject[];

const assertModelObjectArray: AssertModelObjectArray = (
	value,
	requiredFields,
	modelName?
) => {
	if (!Array.isArray(value)) {
		throw TypeError(
			`Expected ${modelName ?? 'object'} array, received ${readableTypeOf(value)}`
		);
	}
	value.every(row => assertModelObject(
		row,
		requiredFields,
		modelName
	));
};

export {
	isObject,
	assertObject,
	isString,
	assertString,
	isObjectArray,
	assertObjectArray,
	isStringArray,
	assertStringArray,
	areObjectArrays,
	assertObjectArrays,
	areStringArrays,
	assertStringArrays,
	isModelObject,
	assertModelObject,
	isModelObjectArray,
	assertModelObjectArray,
};
