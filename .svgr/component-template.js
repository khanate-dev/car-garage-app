//@ts-check

/** @type {import('./svgr.types').SvgrComponentTemplate} */
const svrComponentTemplate = (
	variables,
	{ tpl }
) => tpl`
	${variables.imports};

	${variables.interfaces};

	const ${`${variables.componentName.replace('Svg', '')}Icon`} = (${variables.props}) => (
		${variables.jsx}
	);

	${`export default ${variables.componentName.replace('Svg', '')}Icon;`};
`;

module.exports = svrComponentTemplate;