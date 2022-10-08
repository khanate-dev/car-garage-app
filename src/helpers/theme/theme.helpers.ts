import { ThemeType } from '@ui-kitten/components';

import { ThemeColors } from 'types/general';

const getFgColor = (
	isDarkMode: boolean,
	type: ThemeColors,
	theme: ThemeType
) => (
	theme[`color-${type}-${isDarkMode ? 400 : 600}`] ?? ''
);

const getBgColor = (
	isDarkMode: boolean,
	type: ThemeColors,
	theme: ThemeType
) => (
	theme[`color-${type}-${isDarkMode ? 900 : 100}`] ?? ''
);

const themeColorIcons: Record<ThemeColors, string> = {
	primary: 'bell-outline',
	basic: 'bell-outline',
	control: 'bell-outline',
	success: 'checkmark-circle-outline',
	danger: 'close-circle-outline',
	info: 'bulb-outline',
	warning: 'alert-circle-outline',
};

export {
	getFgColor,
	getBgColor,
	themeColorIcons,
};

const colorHelpers = {
	getFgColor,
	getBgColor,
	themeColorIcons,
};

export default colorHelpers;
