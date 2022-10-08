import { StyleSheet } from 'react-native';

import { isSmallerScreen } from 'config/react';

const formInputStyles = StyleSheet.create({
	input: {
		borderWidth: 2,
		borderColor: 'color-basic-500',
	},
	bottomMargin: {
		marginBottom: isSmallerScreen ? 10 : 20,
	},
	actionAndInput: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		alignItems: 'stretch',
		flex: 0,
	},
	inputWithAction: {
		flex: 1,
		padding: 0,
	},
	action: {
		marginLeft: isSmallerScreen ? 5 : 10,
		borderRadius: 5,
		borderWidth: 2,
		fontSize: 10,
	},
	actionWithLabel: {
		marginTop: isSmallerScreen ? 20 : 20,
	},
	actionWithCaption: {
		marginBottom: 15,
	},
});

export default formInputStyles;
