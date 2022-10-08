import {
	humanizeString,
	formatString,
	HumanizeStringCase,
	FormatStringStrategy,
} from './string.helpers';

const strategies: FormatStringStrategy[] = [
	'camel',
	'pascal',
	'constant',
	'kebab',
	'snake',
];

const casings: HumanizeStringCase[] = [
	'lower',
	'sentence',
	'title',
	'upper',
];

interface FormatTest {
	input: string,
	output: Record<FormatStringStrategy, string>,
}

interface HumanizeTest {
	input: string,
	output: Record<HumanizeStringCase, string>,
}

const formatTests: FormatTest[] = [
	{
		input: 'thisIsSomeTestString',
		output: {
			camel: 'thisIsSomeTestString',
			pascal: 'ThisIsSomeTestString',
			constant: 'THIS_IS_SOME_TEST_STRING',
			kebab: 'this-is-some-test-string',
			snake: 'this_is_some_test_string',
		},
	},
	{
		input: 'this is a VERY     badly   -----formatted.......## STRING.',
		output: {
			camel: 'thisIsAVeryBadlyFormattedString',
			pascal: 'ThisIsAVeryBadlyFormattedString',
			constant: 'THIS_IS_A_VERY_BADLY_FORMATTED_STRING',
			kebab: 'this-is-a-very-badly-formatted-string',
			snake: 'this_is_a_very_badly_formatted_string',
		},
	},
	{
		input: '----SaleOrderID----',
		output: {
			camel: 'saleOrderId',
			pascal: 'SaleOrderId',
			constant: 'SALE_ORDER_ID',
			kebab: 'sale-order-id',
			snake: 'sale_order_id',
		},
	},
];

const humanizeTests: HumanizeTest[] = [
	{
		input: 'thisIsSomeTestString',
		output: {
			lower: 'this is some test string',
			sentence: 'This is some test string',
			title: 'This Is Some Test String',
			upper: 'THIS IS SOME TEST STRING',
		},
	},
	{
		input: 'this is a VERY     badly   -----formatted.......## STRING.',
		output: {
			lower: 'this is a very badly formatted string',
			sentence: 'This is a very badly formatted string',
			title: 'This Is A Very Badly Formatted String',
			upper: 'THIS IS A VERY BADLY FORMATTED STRING',
		},
	},
	{
		input: '----SaleOrderID-----',
		output: {
			lower: 'sale order',
			sentence: 'Sale order',
			title: 'Sale Order',
			upper: 'SALE ORDER',
		},
	},
];

describe.each(formatTests)('test formatString helper', (test) => {
	it(`should return ${test.output.camel} for formatString(${test.input})`, () => {
		const output = formatString(test.input);
		expect(output).toStrictEqual(test.output.camel);
	});
	it.each(strategies)('should return valid formatted string by given parameters', (strategy) => {
		const output = formatString(test.input, strategy);
		expect(output).toStrictEqual(test.output[strategy]);
	});
});

describe.each(humanizeTests)('test humanizeString helper', (test) => {
	it(`should return ${test.output.title} for formatString(${test.input})`, () => {
		const output = humanizeString(test.input);
		expect(output).toStrictEqual(test.output.title);
	});
	it.each(casings)('should return humanized string by the given casing', (casing) => {
		const output = humanizeString(test.input, casing);
		expect(output).toStrictEqual(test.output[casing]);
	});
});
