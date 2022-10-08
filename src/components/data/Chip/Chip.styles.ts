import { StyleSheet } from 'react-native';

import sharedStyles from 'styles/shared';

const getChipStyles = (
	foregroundColor: string,
	backgroundColor: string,
	iconSize: number
) => StyleSheet.create({
	container: {
		...sharedStyles.rowFlex,
		paddingHorizontal: 5,
		paddingVertical: 5,
		overflow: 'hidden',
		borderRadius: 50,
		borderWidth: 2,
		borderColor: foregroundColor,
		backgroundColor,
	},
	icon: {
		width: iconSize,
		height: iconSize,
	},
	text: {
		flex: 1,
		fontSize: 10,
		paddingLeft: 5,
		color: foregroundColor,
	},
});

export default getChipStyles;
