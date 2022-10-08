import { StyleSheet } from 'react-native';

import { isSmallerScreen } from 'config/react';

const shedViewStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	search: {
		borderRadius: 50,
		borderColor: 'color-basic-600',
		borderWidth: 2,
		margin: 0,
		padding: 0,
		paddingHorizontal: isSmallerScreen ? 10 : 30,
		paddingTop: isSmallerScreen ? 10 : 25,
	},
	heading: {
		fontSize: isSmallerScreen ? 16 : 22,
		fontWeight: '500',
		textAlign: 'center',
		paddingHorizontal: isSmallerScreen ? 10 : 25,
		marginBottom: isSmallerScreen ? 5 : 15,
	},
	shedGrid: {
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		padding: isSmallerScreen ? 5 : 15,
		paddingTop: 0,
	},
});

export default shedViewStyles;
