import { StyleProp, ViewStyle } from 'react-native';

import { ThemeColors } from 'types/general';

export interface AppLogoProps {
	/** the styles to apply to the svg element */
	style?: StyleProp<ViewStyle>,
	/** the size of the logo @default 35 */
	size?: number,
	/** the logo's colors @default 'default' */
	type?: 'default' | 'single-color',
	/** the color to use for single-color type logo @default 'primary' */
	color?: ThemeColors,
};
