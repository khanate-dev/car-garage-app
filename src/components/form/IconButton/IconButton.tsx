import { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, useTheme } from '@ui-kitten/components';

import { useDarkMode } from 'contexts/app-state';

import { getFgColor } from 'helpers/theme';

import { IconButtonProps } from './IconButton.types';
import getIconButtonStyles from './IconButton.styles';

const IconButton = ({
	iconStyle,
	type = 'basic',
	name,
	iconFill,
	size = 35,
	appearance = 'ghost',
	isRound,
	autoSize,
	hasBorder,
	...parentProps
}: IconButtonProps) => {

	const theme = useTheme();
	const isDarkMode = useDarkMode();
	const ref = useRef<TouchableOpacity>(null);
	const styles = getIconButtonStyles(
		theme,
		isDarkMode,
		size,
		appearance,
		type,
		autoSize,
		isRound,
		hasBorder
	);

	const iconColor = (
		appearance === 'filled'
			? theme['color-control-default']
			: getFgColor(isDarkMode, type, theme)
	);

	return (
		<TouchableOpacity
			{...parentProps}
			ref={ref}
			style={[
				styles.button,
				parentProps.style,
			]}
			activeOpacity={0.5}
		>
			<Icon
				style={[iconStyle, styles.icon]}
				fill={iconFill ?? iconColor}
				name={name}
			/>
		</TouchableOpacity>
	);
};

export default IconButton;
