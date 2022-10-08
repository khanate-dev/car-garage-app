import { Dimensions, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { ThemeType } from '@ui-kitten/components';

const isSmallerScreen = Dimensions.get('screen').height < 750;
const marginLeft = isSmallerScreen ? 5 : 10;

const getScreenWrapperStyles = (
	theme: ThemeType,
	isDarkMode: boolean
) => StyleSheet.create({
	background: {
		position: 'absolute',
		zIndex: 0,
		width: '100%',
		height: '100%',
		resizeMode: 'stretch',
	},
	safeArea: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
	},
	container: {
		flex: 1,
		position: 'relative',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 50,
		width: '100%',
		padding: 5,
		flexWrap: 'nowrap',
	},
	headerLeft: {
		flex: 1,
		flexShrink: 1,
		height: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		overflow: 'hidden',
	},
	headerRight: {
		flex: 1,
		flexShrink: 1,
		height: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	back: {
		borderRadius: 5,
	},
	title: {
		marginLeft,
		fontWeight: 'bold',
		color: theme[`color-primary-${isDarkMode ? 400 : 600}`],
		fontSize: 14,
		overflow: 'hidden',
	},
	logout: {
		padding: 5,
		borderRadius: 5,
	},
	username: {
		marginLeft,
		fontWeight: '600',
		color: theme[`color-primary-${isDarkMode ? 400 : 600}`],
		fontSize: 14,
	},
	userIcon: {
		marginLeft,
		width: 30,
		height: 30,
		borderColor: theme[`color-primary-${isDarkMode ? 300 : 700}`],
		borderWidth: 3,
		borderRadius: 20,
		backgroundColor: theme[`color-primary-${isDarkMode ? 700 : 300}`],
	},
	themeToggle: {
		marginLeft,
		padding: 5,
		borderRadius: 5,
	},
	screen: {
		flex: 1,
	},
});

export default getScreenWrapperStyles;
