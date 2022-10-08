import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface ScreenWrapperProps {
	children: ReactNode,
	containerStyle?: StyleProp<ViewStyle>,
	title?: string,
	onBack?: () => void,
}
