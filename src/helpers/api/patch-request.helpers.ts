import fetchRequest from './fetch-request.helpers';

import { FetchBaseOptions, FetchBodyOptions } from 'types/fetch';

const patchRequest = (
	apiPath: string,
	body: FetchBodyOptions['body'],
	noAuth?: FetchBaseOptions['noAuth']
) => fetchRequest(apiPath, {
	method: 'PATCH',
	body,
	noAuth,
});

export default patchRequest;
