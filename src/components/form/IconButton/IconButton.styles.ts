import { StyleSheet } from 'react-native';
import { ThemeType } from '@ui-kitten/components';

import { getFgColor } from 'helpers/theme';

import { IconButtonProps } from './IconButton.types';

const getIconButtonStyles = (
	theme: ThemeType,
	isDarkMode: boolean,
	size: number,
	appearance: Exclude<IconButtonProps['appearance'], undefined>,
	type: Exclude<IconButtonProps['type'], undefined>,
	autoSize?: boolean,
	isRound?: boolean,
	hasBorder?: boolean
) => StyleSheet.create({
	button: {
		width: !autoSize ? size : undefined,
		height: !autoSize ? size : undefined,
		borderRadius: (
			isRound
				? autoSize
					? 50
					: size / 2
				: undefined
		),
		backgroundColor: (
			appearance === 'filled'
				? theme[`color-${type}-500`]
				: undefined
		),
		borderColor: (
			appearance === 'outline' || (appearance === 'filled' && hasBorder)
				? getFgColor(isDarkMode, type, theme)
				: undefined
		),
		borderWidth: (
			appearance === 'outline' || (appearance === 'filled' && hasBorder)
				? 2
				: undefined
		),
	},
	icon: {
		width: '100%',
		height: '100%',
	},
});

export default getIconButtonStyles;
