import {
	Icon,
	Layout,
	Text,
	useTheme,
} from '@ui-kitten/components';

import { useDarkMode } from 'contexts/app-state';

import { getBgColor, getFgColor } from 'helpers/theme';

import IconButton from 'components/form/IconButton';

import { ChipProps } from './Chip.types';
import getChipStyles from './Chip.styles';

const iconSize = 20;

const Chip = ({
	containerStyle,
	textStyle,
	iconStyle,
	icon,
	text,
	type = 'basic',
	hasClose,
	onClose,
}: ChipProps) => {

	const theme = useTheme();
	const isDarkMode = useDarkMode();

	const backgroundColor = getBgColor(isDarkMode, type, theme);
	const foregroundColor = getFgColor(isDarkMode, type, theme);
	const styles = getChipStyles(
		foregroundColor,
		backgroundColor,
		iconSize
	);

	return (
		<Layout
			style={[
				styles.container,
				containerStyle,
			]}
		>

			{icon &&
				<Icon
					{...icon}
					style={[
						styles.icon,
						iconStyle,
					]}
					fill={foregroundColor}
				/>
			}

			<Text
				status={type}
				style={[
					styles.text,
					textStyle,
				]}
				numberOfLines={1}
			>
				{text}
			</Text>

			{hasClose &&
				<IconButton
					onPress={onClose}
					name='close-circle-outline'
					iconFill={foregroundColor}
					size={iconSize}
					isRound
				/>
			}

		</Layout>
	);
};

export default Chip;
