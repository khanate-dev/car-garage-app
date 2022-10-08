import usePrevious from 'hooks/previous/previous.hook';

/** checks if the given value has changed */
const useCompare = (
	value: any
): boolean => {
	const prevValue = usePrevious(value);
	return prevValue !== value;
};

export default useCompare;
