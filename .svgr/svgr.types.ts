import { Config } from '@svgr/core';

export type SvgrComponentTemplate = Exclude<Config['template'], undefined>;

export type SvgrIndexTemplate = (filePaths: string[]) => string;

export interface SvgrConfig extends Config {
	runtimeConfig?: boolean,
	outDir?: string,
	ignoreExisting?: boolean,
	ext?: string,
	filenameCase?: string,
	silent?: boolean,
	stdin?: boolean,
	stdinFilepath?: string,
	indexTemplate?: SvgrIndexTemplate,
}
