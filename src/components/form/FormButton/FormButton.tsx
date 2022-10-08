import { forwardRef, Ref } from 'react';
import { ImageStyle, View } from 'react-native';
import {
	Button,
	Icon,
	Spinner,
	useTheme,
} from '@ui-kitten/components';

import { isSmallerScreen } from 'config/react';

import { FormButtonAccessoryLeftProps, FormButtonProps } from './FormButton.types';
import getFormButtonStyles from './FormButton.styles';

const FormButtonAccessoryLeft = ({
	iconLeft,
	isLoading,
	props,
}: FormButtonAccessoryLeftProps) => {

	if (isLoading) {
		return (
			<View style={props?.style}>
				<Spinner status='control' size='small' />
			</View>
		);
	}

	return (
		<Icon
			{...props}
			name={iconLeft ?? 'radio-button-off-outline'}
		/>
	);

};

const FormButton = ({
	label,
	iconLeft,
	status = 'primary',
	appearance = 'filled',
	size = isSmallerScreen ? 'medium' : 'large',
	noMargin,
	hasBorder,
	borders,
	isLoading,
	disabled,
	...parentProps
}: FormButtonProps, ref: Ref<Button>) => {

	const theme = useTheme();
	const styles = getFormButtonStyles(
		theme,
		borders,
		hasBorder || appearance === 'outline',
		noMargin
	);

	return (
		<Button
			ref={ref}
			appearance={appearance}
			size={size}
			status={status}
			{...parentProps}
			disabled={disabled || isLoading}
			accessoryLeft={
				iconLeft || isLoading
					? (props) => <FormButtonAccessoryLeft {...{
						iconLeft,
						isLoading,
						props: {
							...props,
							style: [
								props?.style,
								styles.icon as ImageStyle,
							],
						},
					}} />
					: undefined
			}
			style={[
				styles.button,
				parentProps.style,
			]}
		>
			{label}
		</Button >
	);
};

export default forwardRef<Button, FormButtonProps>(FormButton);
