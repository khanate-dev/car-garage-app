import {
	assertLoggedInUser,
	assertUser,
	LoggedInUser,
	LoginField,
	LoginRequest,
	User,
	UserRequest,
	UserRequestField,
} from 'schemas/user';

import { postRequest } from 'helpers/api';

import { FormState } from 'types/form';

export const login = async (
	form: FormState<LoginField>
): Promise<LoggedInUser> => {

	const body: LoginRequest = {
		Email: form.Email.value.trim(),
		Password: form.Password.value,
	};

	const user = await postRequest(
		'user/signIn',
		body,
		true
	);

	assertLoggedInUser(user);
	return user;

};

export const addUser = async (
	form: FormState<UserRequestField>
): Promise<User> => {

	const body: UserRequest = {
		FarmOwnerName: form.FarmOwnerName.value.trim(),
		CompanyName: form.CompanyName.value.trim(),
		Phone: form.Phone.value.trim(),
		CNIC: form.CNIC.value.trim(),
		Email: form.Email.value.trim().toLowerCase(),
		Password: form.Password.value,
		Google: null,
		Facebook: null,
		Twitter: null,
		Pic: null,
	};

	const response = await postRequest('user/signUp', body, true);
	assertUser(response);

	return response;

};
