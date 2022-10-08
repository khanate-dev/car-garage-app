import { FetchBaseOptions } from 'types/fetch';

import fetchRequest from './fetch-request.helpers';

const getRequest = (
	apiPath: string,
	noAuth?: FetchBaseOptions['noAuth']
) => fetchRequest(apiPath, {
	method: 'GET',
	noAuth,
});

export default getRequest;
