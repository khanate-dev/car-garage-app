import { sheds, users } from './seed-data';

import { backendApiEndpoint } from 'config/react';

import { wait } from 'helpers/time';

import {
	assertLoginRequest,
	assertUserRequest,
	LoggedInUser,
	User,
} from 'schemas/user';
import { Shed } from 'schemas/shed';

const genericAdd = <
	Type extends Record<string, any>,
	Id extends keyof Type
>(
	body: Omit<Type, Id>,
	id: Id,
	list: Type[]
): Type => {
	const newId = Math.max(...list.map(row => row[id]), 0) + 1;
	const addedRow: Type = {
		[id]: newId,
		...body,
	} as any;
	list.push(addedRow);
	return addedRow;
};

const signIn = (request: any): LoggedInUser => {

	assertLoginRequest(request);

	const user = users.find(user => user.Email === request.Email);

	if (!user) {
		throw new Error('Farm Owner Not Found!');
	}
	if (user.Password !== request.Password) {
		throw new Error('Password is Incorrect!');
	}

	return {
		...user,
		token: 'testToken',
	};

};

const addUser = (request: any): User => {
	assertUserRequest(request);
	return genericAdd(
		request,
		'FarmOwnerID',
		users
	);
};

const getSheds = (): Shed[] => sheds;

interface Route {
	path: RegExp | string,
	handler: (body: any, path: string) => any,
}

const routes: Route[] = [
	{
		path: 'user/signIn',
		handler: signIn,
	},
	{
		path: 'user/signUp',
		handler: addUser,
	},
	{
		path: 'shed/getAll',
		handler: getSheds,
	},
];

const sendResponse = async (
	response: Error | Record<string, any> | Record<string, any>[]
): Promise<Response> => {

	const isError = response instanceof Error;

	const json = {
		statusCode: isError ? 500 : 200,
		error: isError ? 'Error!' : 'Success!',
		message: isError ? response.message : 'Operation Successful!',
		data: !isError ? response : undefined,
	};

	const blob = new Blob([JSON.stringify(json)]);
	await wait(500);
	return new Response(blob, {
		status: json.statusCode,
	});

};

const dummyFetch = async (
	apiPath: RequestInfo,
	options: RequestInit
): Promise<Response> => {
	try {

		if (typeof apiPath !== 'string') {
			throw new Error('Incorrect Request Path');
		};
		const path = apiPath.replace(`${backendApiEndpoint}/`, '');

		const method = options.method ?? 'GET';
		const body = (
			['POST', 'PUT'].includes(method)
				? JSON.parse(options.body as string)
				: undefined
		);

		const route = routes.find(route =>
			typeof route.path === 'string'
				? path === route.path
				: route.path.test(path)
		);

		if (!route) throw new Error(`Route ${path} Not Found`);

		const response = route.handler(body, path);
		return sendResponse(response);

	}
	catch (error: any) {
		return sendResponse(error);
	}
};

export default dummyFetch;
