import { StyleProp, ViewStyle } from 'react-native';

import { AlertStatus, ThemeColors } from 'types/general';

export interface AlertBaseProps {
	style?: StyleProp<ViewStyle>,
	text?: string,
	type?: ThemeColors,
	state?: AlertStatus,
	hasIcon?: boolean,
	onClose?: () => void,
}

export interface AlertWithStateProps extends AlertBaseProps {
	text?: undefined,
	type?: undefined,
	state: AlertStatus,
}

export interface AlertWithoutStateProps extends AlertBaseProps {
	text: string,
	type: ThemeColors,
	state?: undefined,
}

export type AlertProps = AlertWithStateProps | AlertWithoutStateProps;
