import { StyleSheet } from 'react-native';

import sharedStyles from 'styles/shared';

const getAlertStyles = (
	foregroundColor: string,
	backgroundColor: string,
	iconSize?: number,
	hasIcon?: boolean
) => StyleSheet.create({
	container: {
		...sharedStyles.rowFlex,
		borderRadius: 10,
		borderWidth: 2,
		paddingHorizontal: 10,
		minHeight: 50,
		maxHeight: 50,
		backgroundColor,
		borderColor: foregroundColor,
	},
	icon: {
		width: iconSize,
		height: iconSize,
		color: foregroundColor,
	},
	text: {
		flex: 1,
		fontSize: 13,
		paddingLeft: hasIcon ? 10 : undefined,
		color: foregroundColor,
		textTransform: 'capitalize',
	},
});

export default getAlertStyles;
