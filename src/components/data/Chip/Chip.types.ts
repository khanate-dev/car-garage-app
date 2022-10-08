import { IconProps } from '@ui-kitten/components';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ThemeColors } from 'types/general';

export interface ChipProps {
	containerStyle?: StyleProp<ViewStyle>,
	textStyle?: StyleProp<TextStyle>,
	iconStyle?: StyleProp<ViewStyle>,
	text: string,
	type?: ThemeColors,
	icon?: IconProps,
	hasClose?: boolean,
	onClose?: () => void,
}
