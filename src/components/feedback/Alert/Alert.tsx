import { Icon, Text, useTheme } from '@ui-kitten/components';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';

import { useDarkMode } from 'contexts/app-state';

import { getBgColor, getFgColor, themeColorIcons } from 'helpers/theme';

import IconButton from 'components/form/IconButton';

import { ThemeColors } from 'types/general';

import { AlertProps } from './Alert.types';
import getAlertStyles from './Alert.styles';

const Alert = ({
	style,
	text,
	type,
	state,
	onClose,
	hasIcon,
}: AlertProps) => {

	const typeToUse: ThemeColors = (
		state
			? typeof state === 'string'
				? 'danger'
				: state.type
			: type ?? 'basic'
	);
	const textToUse: string = (
		state
			? typeof state === 'string'
				? state
				: state.text
			: text ?? ''
	);

	const iconSize = 25;

	const theme = useTheme();
	const isDarkMode = useDarkMode();
	const foregroundColor = getFgColor(isDarkMode, typeToUse, theme);
	const backgroundColor = getBgColor(isDarkMode, typeToUse, theme);

	const styles = getAlertStyles(
		foregroundColor,
		backgroundColor,
		iconSize,
		hasIcon
	);

	if (state === null) return null;

	return (
		<Animated.View
			style={[
				styles.container,
				style,
			]}
			entering={SlideInLeft.springify()}
			exiting={SlideOutRight.springify()}
		>

			{hasIcon &&
				<Icon
					style={styles.icon}
					fill={getFgColor(isDarkMode, typeToUse, theme)}
					name={themeColorIcons[typeToUse]}
				/>
			}

			<Text
				style={styles.text}
				numberOfLines={1}
			>
				{textToUse}
			</Text>

			{onClose &&
				<IconButton
					onPress={onClose}
					name='close-circle-outline'
					iconFill={foregroundColor}
					size={iconSize}
					isRound
				/>
			}

		</Animated.View>
	);
};

export default Alert;
