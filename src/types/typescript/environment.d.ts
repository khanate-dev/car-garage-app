declare global {
	namespace NodeJS {
		interface ProcessEnv {
			ENV?: 'development' | 'production',
			BACKEND_API_IP: string,
			BACKEND_API_PORT: number,
			BACKEND_API_PATH: string,
			SENTRY_ORG: string,
			SENTRY_PROJECT: string,
			SENTRY_AUTH_TOKEN: string,
			SENTRY_DSN: string,
		}
	}
}

export { };
