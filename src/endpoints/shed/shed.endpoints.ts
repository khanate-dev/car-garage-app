import { assertShedArray, Shed } from 'schemas/shed';

import { getRequest } from 'helpers/api';

export const getSheds = async (): Promise<Shed[]> => {
	const sheds = await getRequest('shed/getAll');
	assertShedArray(sheds);
	return sheds;
};
