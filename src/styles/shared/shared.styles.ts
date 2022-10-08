import { StyleSheet } from 'react-native';

const sharedStyles = StyleSheet.create({
	rowFlex: {
		flex: 1,
		flexDirection: 'row',
		flexGrow: 1,
		flexWrap: 'nowrap',
		alignItems: 'center',
	},
	rowFlexChild: {
		flex: 1,
	},
});

export default sharedStyles;
