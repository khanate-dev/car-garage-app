import { StyleSheet } from 'react-native';

import { isSmallerScreen } from 'config/react';

const gap = isSmallerScreen ? 10 : 20;

const weightFormStyles = StyleSheet.create({
	container: {
		padding: gap,
		flexGrow: 1,
		flexShrink: 1,
		overflow: 'hidden',
	},
	table: {
		height: 'auto',
	},
	addButton: {
		marginTop: gap,
		marginBottom: gap,
		maxWidth: 200,
	},
	submitButton: {
		marginTop: 'auto',

	},
	summaryContainer: {
		flexShrink: 0,
	},
	summaryTable: {
		marginTop: gap,
		flex: 0,
		width: '75%',
		marginLeft: 'auto',
		marginRight: 'auto',
		flexShrink: 0,
	},
});

export default weightFormStyles;
