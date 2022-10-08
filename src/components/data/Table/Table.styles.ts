import { StyleSheet } from 'react-native';
import { ThemeType } from '@ui-kitten/components';

import { isSmallerScreen } from 'config/react';

const getTableStyles = (
	theme: ThemeType,
	isDarkMode: boolean
) => StyleSheet.create({
	container: {
		flexGrow: 0,
		flexShrink: 1,
		width: '100%',
	},
	table: {
		width: '100%',
	},
	emptyLabel: {
		padding: isSmallerScreen ? 10 : 15,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		width: '100%',
	},
	row: {
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		overflow: 'hidden',
		alignItems: 'stretch',
	},
	headerRow: {

	},
	bodyRow: {

	},
	cell: {
		margin: 5,
		padding: isSmallerScreen ? 10 : 15,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: theme[`color-basic-${isDarkMode ? 300 : 700}`],
	},
	headerCell: {
		backgroundColor: theme['color-primary-transparent-400'],
	},
	bodyCell: {
		backgroundColor: theme[`color-basic-${isDarkMode ? 700 : 200}`],
	},
	cellText: {
		fontSize: isSmallerScreen ? 13 : 15,
		fontWeight: '400',
	},
	headerCellText: {
	},
	bodyCellText: {
	},
});

export default getTableStyles;
