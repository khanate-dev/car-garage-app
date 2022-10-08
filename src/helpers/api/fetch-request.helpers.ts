import * as Network from 'expo-network';

import { backendApiEndpoint, isFetchMocked } from 'config/react';
import { getUserSetting } from 'helpers/settings';
import { invalidateUser } from 'helpers/events';

import mockFetch from 'mocks/mock-fetch';

import { ApiErrorType, FetchOptions, FetchResponse } from 'types/fetch';

class ApiError extends Error {
	type: ApiErrorType;
	constructor(message: string, type: ApiErrorType = 'ApiError') {
		super(message);
		this.type = type;
	}
}

const fetchRequest = async (apiPath: string, options: FetchOptions = {}): Promise<FetchResponse> => {
	try {

		const { noAuth, body, ...otherOptions } = options;

		if (!isFetchMocked) {
			const { isInternetReachable } = await Network.getNetworkStateAsync();
			if (!isInternetReachable) {
				throw new ApiError(
					'Not Connected To The Internet!',
					'InternetConnectionError'
				);
			}
		}

		const requestOptions: RequestInit = otherOptions as RequestInit;

		if (!noAuth) {
			const user = await getUserSetting('user');
			if (!user?.token) {
				throw new ApiError(
					'User Auth Token Not Found!',
					'ApiAuthError'
				);
			}
			requestOptions.headers = {
				...requestOptions.headers,
				Authorization: `Bearer ${user.token}`,
			};
		}

		if (body) {

			const isJson = !(body instanceof FormData);

			requestOptions.body = (
				isJson
					? JSON.stringify(body)
					: body
			);

			if (isJson) {
				requestOptions.headers = {
					...requestOptions.headers,
					'Content-Type': 'application/json',
				};
			}

		}

		const requestApi = isFetchMocked ? mockFetch : fetch;
		const requestPath = `${backendApiEndpoint}/${apiPath}`;

		const response = await requestApi(requestPath, requestOptions);
		const json = await response.json();

		const isError = (
			!response.ok
			|| json.statusCode !== 200
			|| (json.error?.errorCode && parseInt(json?.error?.errorCode) !== 0)
		);

		if (response.status === 401) {
			throw new ApiError(
				'Login Expired!',
				'ApiAuthError'
			);
		}

		if (isError) {
			return Promise.reject(new ApiError(
				json?.message
				?? json?.error?.errorDescription
				?? json?.error?.errorMessage
				?? (
					typeof json?.error === 'string'
						? json?.error
						: 'There Was A Problem With The Request!'
				),
				'ApiError'
			));
		}

		return json.data;

	}
	catch (error: any) {
		if (error instanceof ApiError) {
			if (error.type === 'ApiAuthError') {
				invalidateUser();
			}
			return Promise.reject(error);
		}
		return Promise.reject(
			new ApiError(
				`Error Fetching From API: ${error.message ?? error}`,
				'ApiConnectionError'
			)
		);
	}
};

export default fetchRequest;
