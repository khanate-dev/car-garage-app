import { ApiErrorType } from './api.error.types';

class ApiError extends Error {
	type: ApiErrorType;
	constructor(
		message: string,
		type: ApiErrorType = 'ApiError'
	) {
		super(message);
		this.type = type;
	}
}

export default ApiError;
