import * as SecureStore from 'expo-secure-store';

import { isLoggedInUser } from 'schemas/user';

import { Settings } from 'types/general';

const getUserSetting = async <Key extends keyof Settings>(
	key: Key
): Promise<null | Settings[Key]> => {
	try {

		const result = await SecureStore.getItemAsync(key);
		if (!result) return null;

		const parsedResult = JSON.parse(result);
		const isInvalid = (
			(key === 'isDarkMode' && typeof parsedResult !== 'boolean')
			|| (key === 'user' && !isLoggedInUser(parsedResult))
		);
		if (isInvalid) {
			await removeUserSetting(key);
			return null;
		}
		return parsedResult;

	}
	catch {
		return null;
	}
};

const setUserSetting = async <Key extends keyof Settings>(
	key: Key,
	value: Settings[Key]
): Promise<void> => (
	await SecureStore.setItemAsync(key, JSON.stringify(value))
);

const removeUserSetting = async <Key extends keyof Settings>(
	key: Key
): Promise<void> => (
	await SecureStore.deleteItemAsync(key)
);

export {
	getUserSetting,
	setUserSetting,
	removeUserSetting,
};
