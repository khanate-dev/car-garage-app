import { Icon, Text, useTheme } from '@ui-kitten/components';

import FormButton from 'components/form/FormButton';
import ScreenWrapper from 'components/layout/ScreenWrapper';

import { ErrorPageProps } from './ErrorPage.types';
import styles from './ErrorPage.styles';

const ErrorPage = ({
	title,
	heading,
	message,
	onBack,
}: ErrorPageProps) => {

	const theme = useTheme();

	return (
		<ScreenWrapper
			containerStyle={styles.container}
			title={title ?? 'Error'}
			onBack={onBack}
		>

			<Icon
				style={styles.icon}
				name='alert-triangle'
				fill={theme['color-danger-500']}
			/>

			<Text
				style={styles.heading}
				status='danger'
				category='h1'
				appearance='hint'
			>
				{heading ?? 'Oops!'}
			</Text>

			<Text
				style={styles.error}
				status='basic'
				appearance='hint'
			>
				{message ?? 'Something Went Wrong!'}
			</Text>

			<FormButton
				style={styles.button}
				label='Back'
				size='medium'
				status='danger'
				appearance='outline'
				borders='curved'
				onPress={onBack}
			/>

		</ScreenWrapper>
	);
};

export default ErrorPage;
