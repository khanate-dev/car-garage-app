import { useState } from 'react';
import { Text } from '@ui-kitten/components';

import { useSetLoading, useUpdateUser } from 'contexts/app-state';

import { loginFormFields, LoginField } from 'schemas/user';
import { login } from 'endpoints/user';

import { getDefaultFormState } from 'helpers/defaults';

import ScreenWrapper from 'components/layout/ScreenWrapper';
import FormContainer from 'components/form/FormContainer';

import { AlertStatus } from 'types/general';
import { FormState } from 'types/form';

import styles from './Login.styles';

const initialForm = getDefaultFormState(loginFormFields);

const Login = () => {

	const updateUser = useUpdateUser();
	const setIsLoading = useSetLoading();

	const [form, setForm] = useState<FormState<LoginField>>(initialForm);
	const [status, setStatus] = useState<AlertStatus>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const handleSubmit = async () => {
		try {

			setStatus(null);
			setIsSubmitting(true);
			setIsLoading(true);

			const user = await login(form);

			setStatus({ text: 'Logged In! Redirecting...', type: 'success' });

			setTimeout(() => updateUser(user), 1000);

		}
		catch (error: any) {
			setStatus(error.message ?? error);
		}
		finally {
			setIsSubmitting(false);
			setIsLoading(false);
		}
	};

	return (
		<ScreenWrapper
			containerStyle={styles.container}
			title='Login'
		>

			<Text
				style={styles.header}
				category='h2'
				status='primary'
			>
				Hi!{'\n'}Please{'\n'}Login
			</Text>

			<FormContainer
				form={form}
				setForm={setForm}
				formFields={loginFormFields}
				status={status}
				submitLabel={isSubmitting ? 'Logging In...' : 'Login'}
				onSubmit={handleSubmit}
				isBusy={isSubmitting}
				hasIcons
			/>

		</ScreenWrapper>
	);
};

export default Login;
