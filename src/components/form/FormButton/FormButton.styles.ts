import { ThemeType } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import { isSmallerScreen } from 'config/react';

import { FormButtonProps } from './FormButton.types';

const getFormButtonStyles = (
	theme: ThemeType,
	borders?: FormButtonProps['borders'],
	hasBorder?: boolean,
	noMargin?: boolean
) => StyleSheet.create({
	button: {
		borderWidth: hasBorder ? 2 : undefined,
		borderColor: (
			hasBorder
				? theme['text-basic-color']
				: undefined
		),
		marginTop: !noMargin ? 20 : undefined,
		borderRadius: (
			borders === 'rounded'
				? 100
				: borders === 'curved'
					? 10
					: undefined
		),
	},
	icon: {
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: isSmallerScreen ? 0 : 5,
	},
});

export default getFormButtonStyles;
