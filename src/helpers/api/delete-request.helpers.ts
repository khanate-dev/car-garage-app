import fetchRequest from './fetch-request.helpers';

import { FetchBaseOptions } from 'types/fetch';

const deleteRequest = (
	apiPath: string,
	noAuth?: FetchBaseOptions['noAuth']
) => fetchRequest(apiPath, {
	method: 'DELETE',
	noAuth,
});

export default deleteRequest;
