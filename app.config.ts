import { ExpoConfig, ConfigContext } from '@expo/config';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

import { ExpoEnvironment } from 'types/expo';

const {
	ENV,
	BACKEND_API_PATH,
	SENTRY_ORG,
	SENTRY_PROJECT,
	SENTRY_AUTH_TOKEN,
	SENTRY_DSN,
} = process.env;

const environment: ExpoEnvironment['NODE_ENV'] = (
	ENV === 'development'
		? 'development'
		: 'production'
);

const config = dotenv.config({
	path: `./.env.${environment}`,
});
dotenvExpand.expand(config);

const extra: ExpoEnvironment = {
	NODE_ENV: environment,
	BACKEND_API_PATH: BACKEND_API_PATH ?? 'http://localhost:5000',
	SENTRY_DSN,
};

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: 'Car Garage App',
	slug: 'car-garage-app',
	description: 'Car Garage Mobile Application',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './assets/icon.png',
	userInterfaceStyle: 'automatic',
	extra: {
		...extra,
		eas: {
			projectId: 'bc48a116-857f-4f10-b023-ad0ab64c924e',
		},
	},
	githubUrl: 'https://github.com/khanate-dev/car-garage-app',
	platforms: [
		'android',
		'ios',
	],
	primaryColor: '#B591DE',
	splash: {
		image: './assets/splash.png',
		resizeMode: 'contain',
		backgroundColor: '#B591DE',
	},
	updates: {
		enabled: true,
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: [
		'**/*',
	],
	androidStatusBar: {
		barStyle: 'light-content',
	},
	ios: {
		bundleIdentifier: 'pk.khanate.carGarageApp',
		buildNumber: '1.0.0',
		supportsTablet: true,
	},
	android: {
		package: 'pk.khanate.carGarageApp',
		versionCode: 1,
		adaptiveIcon: {
			foregroundImage: './assets/adaptive-icon.png',
			backgroundColor: '#FFFFFF',
		},
	},
	plugins: [
		'sentry-expo',
	],
	hooks: {
		postPublish: [
			{
				file: 'sentry-expo/upload-sourcemaps',
				config: {
					organization: SENTRY_ORG,
					project: SENTRY_PROJECT,
					authToken: SENTRY_AUTH_TOKEN,
					setCommits: true,
				},
			},
		],
	},
});
