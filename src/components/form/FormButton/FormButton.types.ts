import { ImageProps } from 'react-native';
import { ButtonProps } from '@ui-kitten/components';

import { ThemeColors } from 'types/general';

export interface FormButtonProps extends Omit<ButtonProps, 'status' | 'appearance'> {
	label: ButtonProps['children'],
	iconLeft?: string,
	status?: ThemeColors,
	appearance?: 'filled' | 'outline' | 'ghost',
	borders?: 'rounded' | 'curved' | 'straight',
	noMargin?: boolean,
	hasBorder?: boolean,
	isLoading?: boolean,
}

export interface FormButtonAccessoryLeftProps extends Pick<FormButtonProps, 'iconLeft' | 'isLoading'> {
	props: Partial<ImageProps> | undefined,
}
