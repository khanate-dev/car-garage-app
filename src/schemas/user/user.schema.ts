import { isModelObject, assertModelObject } from 'helpers/type';

import { FormField } from 'types/form';
import { AssertFunction } from 'types/general';

export interface User {
	FarmOwnerID: number,
	FarmOwnerName: string,
	CompanyName: string,
	Phone: string,
	CNIC: string,
	Email: string,
	Password: string,
	Google: null | string,
	Facebook: null | string,
	Twitter: null | string,
	Pic: null | string,
	token?: string,
}

const requiredUserFields: (keyof User)[] = [
	'FarmOwnerID',
	'FarmOwnerName',
	'CompanyName',
	'Phone',
	'CNIC',
	'Email',
	'Password',
];

export type UserRequest = Omit<User, 'FarmOwnerID' | 'token'>;
export type UserRequestField = keyof UserRequest;
const userRequestFields: (keyof UserRequest)[] = [
	'FarmOwnerName',
	'CompanyName',
	'Phone',
	'CNIC',
	'Email',
	'Password',
	'Google',
	'Facebook',
	'Twitter',
	'Pic',
];
export const userFormFields: FormField<UserRequestField>[] = [
	{ name: 'FarmOwnerName', type: 'string' },
	{ name: 'CompanyName', type: 'string' },
	{ name: 'Phone', type: 'phone' },
	{ name: 'CNIC', type: 'string' },
	{ name: 'Email', type: 'email' },
	{ name: 'Password', type: 'password' },
];

export type LoginRequest = Pick<User, 'Email' | 'Password'>;
export type LoginField = keyof LoginRequest;
export const loginFields: (keyof LoginRequest)[] = [
	'Email',
	'Password',
];
export const loginFormFields: FormField<LoginField>[] = [
	{ name: 'Email', type: 'email' },
	{ name: 'Password', type: 'password' },
];

export interface LoggedInUser extends User {
	token: string,
}

const requiredLoggedInUserFields = [
	...requiredUserFields,
	'token',
] as (keyof LoggedInUser)[];

export const forgotPasswordFields = [
	'email',
	'code',
	'password',
	'confirmPassword',
] as const;
export type ForgotPasswordField = typeof forgotPasswordFields[number];

export const forgotPasswordFormFields: FormField<ForgotPasswordField>[] = [
	{ name: 'email', type: 'email' },
	{ name: 'code', type: 'int', label: 'Reset Code' },
	{ name: 'password', type: 'password' },
	{ name: 'confirmPassword', type: 'password' },
];

export const isUser = (value: any): value is User => (
	isModelObject(value, requiredUserFields)
);

export const assertUser: AssertFunction<User> = (value) => (
	assertModelObject(value, requiredUserFields)
);

export const isLoginRequest = (value: any): value is LoginRequest => (
	isModelObject(value, loginFields)
);

export const assertLoginRequest: AssertFunction<LoginRequest> = (value) => (
	assertModelObject(value, loginFields)
);

export const isLoggedInUser = (value: any): value is LoggedInUser => (
	isModelObject(value, requiredLoggedInUserFields)
);

export const assertLoggedInUser: AssertFunction<LoggedInUser> = (value) => (
	assertModelObject(
		value,
		requiredLoggedInUserFields,
		'User'
	)
);

export const isUserRequest = (value: any): value is UserRequest => (
	isModelObject(value, userRequestFields)
);

export const assertUserRequest: AssertFunction<UserRequest> = (value) => (
	assertModelObject(value, userRequestFields)
);
