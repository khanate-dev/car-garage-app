import { isFetchMocked, isSmallerScreen } from 'config/react';
import { StyleSheet } from 'react-native';

const shedCardStyles = StyleSheet.create({
	shedOuterContainer: {
		overflow: 'hidden',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
	shedTouchable: {
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		padding: isSmallerScreen ? 5 : 10,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
	shedContainer: {
		width: '100%',
		height: '100%',
		borderRadius: 15,
		overflow: 'hidden',
		elevation: 3,
	},
	shedHeading: {
		paddingTop: isSmallerScreen ? 5 : 10,
		paddingLeft: isSmallerScreen ? 10 : 15,
		paddingRight: isSmallerScreen ? 5 : 10,
		paddingBottom: isSmallerScreen ? 0 : 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	shedHeadingText: {
		fontWeight: '400',
		color: 'color-basic-100',
		fontSize: isSmallerScreen ? 22 : 26,
	},
	shedBody: {
		marginTop: 'auto',
		marginBottom: 'auto',
		flexDirection: 'row',
		paddingHorizontal: 5,
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	cardContainer: {
		width: '33.333%',
		padding: 5,
	},
	unexpendedCard: {
		width: '50%',
	},
	wider: {
		width: '50%',
	},
	full: {
		width: isSmallerScreen ? '100%' : '90%',
	},
	hidden: {
		display: 'none',
	},
	card: {
		backgroundColor: 'color-basic-100',
		borderRadius: 10,
		overflow: 'hidden',
		paddingHorizontal: isSmallerScreen ? 5 : 10,
		paddingVertical: 5,
		flexDirection: 'row',
		justifyContent: 'center',
		fontWeight: 'bold',
		width: '100%',
		height: isSmallerScreen ? 45 : 50,
		elevation: 5,
	},
	cardBigger: {
		height: isSmallerScreen ? 55 : 60,
		paddingHorizontal: isSmallerScreen ? 8 : 15,
	},
	cardContent: {
		justifyContent: 'center',
		overflow: 'hidden',
	},
	cardValue: {
		color: 'color-basic-800',
		fontSize: isSmallerScreen ? 13 : 16,
	},
	cardValueBigger: {
		fontSize: isFetchMocked ? 15 : 20,
	},
	cardLabel: {
		fontSize: isSmallerScreen ? 9 : 12,
		fontWeight: 'normal',
		color: 'color-basic-600',
	},
	cardLabelBigger: {
		fontSize: isSmallerScreen ? 11 : 14,
	},
	cardIcon: {
		flexShrink: 0,
		flexGrow: 0,
		width: isSmallerScreen ? 30 : 35,
		marginLeft: 'auto',
	},
	actionIcon: {
		marginLeft: 0,
		marginRight: isSmallerScreen ? 0 : 10,
	},
	cardIconBigger: {
		width: isSmallerScreen ? 35 : 45,
	},
	shedFooter: {
		backgroundColor: 'color-basic-100',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		height: isSmallerScreen ? 45 : 50,
	},
	footerLabel: {
		fontSize: isSmallerScreen ? 18 : 22,
		color: 'color-basic-700',
		textAlign: 'center',
		fontWeight: '600',
		justifyContent: 'center',
		alignItems: 'center',
		flexGrow: 1,
		flexShrink: 1,
	},
	footerSale: {
		position: 'absolute',
		right: 8,
		top: (isSmallerScreen ? 45 : 50) / 2 - 15,
		width: 30,
		height: 30,
	},
	footerSaleIcon: {
		width: '100%',
		height: '100%',
	},
	footerSaleText: {
		position: 'absolute',
		top: 0,
		right: 0,
		fontSize: 11,
		fontWeight: '900',
		width: 15,
		height: 15,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		backgroundColor: 'color-danger-500',
		color: 'color-basic-100',
		borderRadius: 7,
	},
	footerAction: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	footerActionGradient: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	footerActionCompleted: {
		backgroundColor: 'color-info-100',
	},
	footerActionLabel: {
		fontSize: isSmallerScreen ? 18 : 22,
		color: 'color-basic-700',
		textAlign: 'center',
		fontWeight: '600',
		justifyContent: 'center',
		alignItems: 'center',
	},
	notLast: {
		borderRightWidth: 1,
		borderRightColor: 'color-basic-700',
	},
	saleButton: {
		backgroundColor: 'color-danger-400',
		height: isSmallerScreen ? 40 : 45,
		justifyContent: 'center',
		alignItems: 'center',
	},
	saleButtonText: {
		color: 'color-basic-100',
		fontSize: isSmallerScreen ? 17 : 20,
		fontWeight: '600',
	},
});

export default shedCardStyles;
