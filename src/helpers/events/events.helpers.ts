import { DeviceEventEmitter } from 'react-native';

/** fires the invalidate-user event to force logout on authentication errors */
const invalidateUser = () => {
	DeviceEventEmitter.emit('invalidate-user');
};

export {
	invalidateUser,
};
