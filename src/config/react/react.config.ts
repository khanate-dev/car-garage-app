import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Sentry from 'sentry-expo';
import { ModalService } from '@ui-kitten/components';

import { ExpoEnvironment } from 'types/expo';

ModalService.setShouldUseTopInsets = true;

const {
	NODE_ENV,
	BACKEND_API_PATH,
	SENTRY_DSN,
} = Constants.manifest?.extra as ExpoEnvironment;

type Environment = ExpoEnvironment['NODE_ENV'];

const isValidEnvironment = (
	environment: string | undefined
): environment is Environment => (
	environment !== undefined
	&& ['development', 'production'].includes(environment)
);

const environment: Environment = (
	isValidEnvironment(NODE_ENV)
		? NODE_ENV
		: 'development'
);

if (environment === 'production') {
	Sentry.init({
		dsn: SENTRY_DSN,
		enableInExpoDevelopment: true,
		debug: false,
		tracesSampleRate: 1.0,
	});
}

/** the base url path for the backend api's */
const backendApiEndpoint: string = (
	BACKEND_API_PATH
	?? 'http://localhost:5000'
);

const isFetchMockedConfig: Record<Environment, boolean> = {
	development: true,
	production: true,
};

/** should the app use mocked fetch? used for demos and testing */
const isFetchMocked: boolean = isFetchMockedConfig[environment];

const isSmallerScreen = Dimensions.get('screen').width <= 400;

const shouldAutoFillConfig: Record<Environment, boolean> = {
	development: true,
	production: true,
};

/** should the app auto fill inputs with default values? */
const shouldAutoFill: boolean = shouldAutoFillConfig[environment];

export {
	environment,
	backendApiEndpoint,
	isFetchMocked,
	isSmallerScreen,
	shouldAutoFill,
};
