import { StyleSheet } from 'react-native';

const shedFormModalStyles = StyleSheet.create({
	backdrop: {
		backgroundColor: 'color-danger-transparent-600',
	},
	modal: {
		padding: 50,
		borderRadius: 20,
		elevation: 10,
		width: 340,
		maxWidth: '100%',
		minHeight: 425,
		backgroundColor: 'background-basic-color-1',
	},
	heading: {
		textAlign: 'center',
		fontSize: 25,
		marginBottom: 10,
	},
});

export default shedFormModalStyles;
