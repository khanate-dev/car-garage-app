import { User } from 'schemas/user';
import { Shed } from 'schemas/shed';

export const users: User[] = [
	{
		FarmOwnerID: 1,
		FarmOwnerName: 'test',
		Password: '12345',
		CompanyName: 'test',
		Phone: '+92090078601',
		CNIC: '35202352021',
		Email: 'testing@test.com',
		Facebook: null,
		Google: null,
		Twitter: null,
		Pic: '0',
		token: 'testAuthToken12345',
	},
];

export const sheds: Shed[] = [
	{
		shedId: 1,
		name: 'Shed 1',
	},
	{
		shedId: 2,
		name: 'Shed 2',
		cleanOut: {
			surfactant: {
				name: 'test',
				contactTime: 'morning',
				doseRate: 12.7,
				entryTime: '2022-06-18T10:20:00.000Z',
			},
		},
	},
	{
		shedId: 3,
		name: 'Shed 3',
		cleanOut: {
			surfactant: {
				name: 'test',
				contactTime: 'noon',
				doseRate: 25.23,
				entryTime: '2022-07-02T10:20:00.000Z',
			},
			disinfectant: {
				name: 'test',
				contactTime: 'evening',
				doseRate: 12.23,
				entryTime: '2022-07-02T10:20:00.000Z',
			},
			drinkingLine: {
				name: 'test',
				contactTime: 'morning',
				doseRate: 28.44,
				entryTime: '2022-07-03T10:20:00.000Z',
			},
		},
	},
	{
		shedId: 4,
		name: 'Shed 4',
		cleanOut: {
			surfactant: {
				name: 'test',
				contactTime: 'noon',
				doseRate: 25.23,
				entryTime: '2022-07-02T10:20:00.000Z',
			},
			disinfectant: {
				name: 'test',
				contactTime: 'evening',
				doseRate: 12.23,
				entryTime: '2022-07-02T10:20:00.000Z',
			},
			drinkingLine: {
				name: 'test',
				contactTime: 'morning',
				doseRate: 28.44,
				entryTime: '2022-07-03T10:20:00.000Z',
			},
			fumigant: {
				name: 'test',
				contactTime: 'night',
				doseRate: 51.04,
				entryTime: '2022-07-04T10:20:00.000Z',
			},
		},
	},
	{
		shedId: 5,
		name: 'Shed 5',
		cleanOut: {
			surfactant: {
				name: 'test',
				contactTime: 'noon',
				doseRate: 25.23,
				entryTime: '2022-07-02T10:20:00.000Z',
			},
			disinfectant: {
				name: 'test',
				contactTime: 'evening',
				doseRate: 12.23,
				entryTime: '2022-07-02T10:20:00.000Z',
			},
			drinkingLine: {
				name: 'test',
				contactTime: 'morning',
				doseRate: 28.44,
				entryTime: '2022-07-03T10:20:00.000Z',
			},
			fumigant: {
				name: 'test',
				contactTime: 'night',
				doseRate: 51.04,
				entryTime: '2022-07-04T10:20:00.000Z',
			},
		},
		flock: {
			date: '2022-07-10T10:20:00.000Z',
			totalChicks: 42,
			chickCompany: 'test',
			chickQuality: 'test',
			transportMortality: 5.23,
		},
	},
	{
		shedId: 6,
		name: 'Shed 6',
		cleanOut: {
			surfactant: {
				name: 'test',
				contactTime: 'noon',
				doseRate: 25.23,
				entryTime: '2022-07-02T10:20:00.000Z',
			},
			disinfectant: {
				name: 'test',
				contactTime: 'evening',
				doseRate: 12.23,
				entryTime: '2022-07-02T10:20:00.000Z',
			},
			drinkingLine: {
				name: 'test',
				contactTime: 'morning',
				doseRate: 28.44,
				entryTime: '2022-07-03T10:20:00.000Z',
			},
			fumigant: {
				name: 'test',
				contactTime: 'night',
				doseRate: 51.04,
				entryTime: '2022-07-04T10:20:00.000Z',
			},
		},
		flock: {
			date: '2022-07-01T10:20:00.000Z',
			totalChicks: 42,
			chickCompany: 'test',
			chickQuality: 'test',
			transportMortality: 5.23,
		},
		mortality: {
			mortality: 12.223,
			culling: 23.2,
		},
		fcr: {
			feed: 'test',
			bags: 124,
		},
		weight: [{
			batchSize: 2500,
			batchWeight: 4100,
		}],
		isSelling: true,
		contracts: [
			{
				contractId: 1,
				name: 'Contract 1',
				availableQuantity: 1050,
				bookedQuantity: 1000,
				truckNo: 'SRA-421',
			},
			{
				contractId: 2,
				name: 'Contract 2',
				availableQuantity: 800,
				bookedQuantity: 700,
				truckNo: 'SRA-421',
			},
			{
				contractId: 3,
				name: 'Contract 3',
				availableQuantity: 1130,
				bookedQuantity: 810,
				truckNo: 'SRA-421',
			},
			{
				contractId: 4,
				name: 'Contract 4',
				availableQuantity: 300,
				bookedQuantity: 230,
				truckNo: 'SRA-421',
			},
			{
				contractId: 5,
				name: 'Contract 5',
				availableQuantity: 300,
				bookedQuantity: 150,
				truckNo: 'SRA-421',
			},
		],
	},
];
