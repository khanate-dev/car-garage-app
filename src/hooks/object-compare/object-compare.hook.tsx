import usePrevious from 'hooks/previous/previous.hook';

import { GenericObject } from 'types/general';

/** shallow compare an object for changed keys */
const useObjectCompare = <Type extends GenericObject>(
	object: Type
): (keyof Type)[] => {

	const previousObject = usePrevious(object);

	const changedKeys = Object.keys(object).filter(key =>
		object[key] !== previousObject?.[key]
	);

	return changedKeys;

};

export default useObjectCompare;
