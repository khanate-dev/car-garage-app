import { isDate } from 'helpers/date';

const wait = async (milliseconds: number) => {
	await new Promise(r => setTimeout(r, milliseconds));
	return Promise.resolve();
};

const getAgeFromDate = (value: Date | string): number => {
	if (!isDate(value)) return 0;
	const start = new Date(value);
	const end = new Date();
	const milliseconds = end.getTime() - start.getTime();
	return Math.floor(
		milliseconds
		/ (1000 * 60 * 60 * 24)
	);
};

export {
	wait,
	getAgeFromDate,
};
