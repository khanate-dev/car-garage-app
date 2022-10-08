import { StyleSheet } from 'react-native';

import { isSmallerScreen } from 'config/react';

const loginStyles = StyleSheet.create({
	container: {
		padding: isSmallerScreen ? 25 : 50,
	},
	header: {
		fontWeight: '200',
		marginBottom: 25,
	},
});

export default loginStyles;
