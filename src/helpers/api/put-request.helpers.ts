import fetchRequest from './fetch-request.helpers';

import { FetchBaseOptions, FetchBodyOptions } from 'types/fetch';

const putRequest = (
	apiPath: string,
	body: FetchBodyOptions['body'],
	noAuth?: FetchBaseOptions['noAuth']
) => fetchRequest(apiPath, {
	method: 'PUT',
	body,
	noAuth,
});

export default putRequest;
