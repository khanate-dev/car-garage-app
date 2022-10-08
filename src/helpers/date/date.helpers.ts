const isDate = (value: any): value is string | Date => {
	if (
		typeof value !== 'string'
		&& typeof value !== 'number'
		&& !(value instanceof Date)
	) return false;
	const date = (
		value instanceof Date
			? value
			: new Date(value)
	);
	return !isNaN(date.getTime());
};

const getDateOrNull = (value: any): null | Date => {
	if (
		typeof value !== 'string'
		&& typeof value !== 'number'
		&& !(value instanceof Date)
	) return null;
	const date = (
		value instanceof Date
			? value
			: new Date(value)
	);
	if (isNaN(date.getTime())) return null;
	return date;
};

const compareDate = (
	first: string | Date,
	second: string | Date
) => (
	new Date(first).getTime() - new Date(second).getTime()
);

export {
	isDate,
	getDateOrNull,
	compareDate,
};
