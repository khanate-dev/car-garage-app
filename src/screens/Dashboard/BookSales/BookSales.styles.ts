import { StyleSheet } from 'react-native';

import { isSmallerScreen } from 'config/react';

const bookSalesStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: isSmallerScreen ? 5 : 10,
	},
	contracts: {
		flexGrow: 1,
		flexShrink: 1,
	},
	contractContainer: {
		padding: isSmallerScreen ? 7 : 10,
	},
	contract: {
		width: '100%',
		borderRadius: 15,
		paddingHorizontal: isSmallerScreen ? 10 : 15,
		paddingVertical: isSmallerScreen ? 5 : 10,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 3,
	},
	contractLabel: {
		fontSize: 22,
		fontWeight: '600',
		color: 'color-basic-100',
	},
	summaryTable: {
		padding: isSmallerScreen ? 5 : 10,
	},
	summaryContainer: {
		flexShrink: 0,
	},
});

export default bookSalesStyles;
