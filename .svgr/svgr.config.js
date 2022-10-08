// @ts-check

/** @type {import('./svgr.types').SvgrConfig} */
const config = {
	expandProps: 'end',
	typescript: true,
	jsxRuntime: 'automatic',
	native: true,
	runtimeConfig: false,
	outDir: './src/components/icons',
	template: require('./component-template.js'),
	indexTemplate: require('./index-template.js'),
	ext: 'icon.tsx',
	index: true,
	prettierConfig: {
		useTabs: true,
		semi: true,
		tabWidth: 4,
		singleQuote: true,
		jsxSingleQuote: true,
		endOfLine: 'lf',
		trailingComma: 'all',
	},
	svgoConfig: {
		plugins: [
			{
				name: 'preset-default',
				params: {
					overrides: {
						removeViewBox: false,
					},
				},
			},
			'reusePaths',
			'sortAttrs',
			'removeDimensions',
		],
	},
};

module.exports = config;