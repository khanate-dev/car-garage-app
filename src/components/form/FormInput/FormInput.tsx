import { Ref, useState, forwardRef } from 'react';
import { KeyboardTypeOptions, View } from 'react-native';
import { Icon, Input, useStyleSheet } from '@ui-kitten/components';

import IconButton from 'components/form/IconButton';
import FormButton from 'components/form/FormButton';
import FormDatePicker from 'components/form/FormDatePicker';

import { FormInputProps } from './FormInput.types';
import formInputStyles from './FormInput.styles';

const keyboardTypes: Record<FormInputProps['type'], KeyboardTypeOptions> = {
	email: 'email-address',
	float: 'decimal-pad',
	int: 'number-pad',
	phone: 'phone-pad',
	password: 'default',
	string: 'default',
	search: 'default',
	date: 'default',
};

const icons: Record<FormInputProps['type'], string> = {
	email: 'at-outline',
	float: 'hash-outline',
	int: 'hash-outline',
	phone: 'phone-outline',
	password: 'keypad-outline',
	string: 'edit-outline',
	search: 'search-outline',
	date: 'calendar-outline',
};

const FormInput = ({
	style,
	controlStyle,
	type,
	state,
	onChange,
	size,
	status,
	button,
	hasIcon,
	noCaption,
	noMargin,
	isLast,
	...textInputProps
}: FormInputProps, ref: Ref<Input>) => {

	const styles = useStyleSheet(formInputStyles);
	const [isSecret, setIsSecret] = useState<boolean>(true);

	let input: JSX.Element;

	const inputStatus = state.error ? 'danger' : status;

	if (type === 'date') {
		input = (
			<FormDatePicker
				ref={ref}
				{...textInputProps as any}
				style={[
					(!noMargin && !button) && styles.bottomMargin,
					button && styles.inputWithAction,
					style,
				]}
				controlStyle={[
					styles.input,
					controlStyle,
				]}
				onChange={onChange}
				state={state}
				size={size}
				status={inputStatus}
				hasIcon={hasIcon}
				noCaption={noCaption}
				noMargin={noMargin}
				disabled={false}
			/>
		);
	}
	else {
		input = (
			<Input
				ref={ref}
				{...textInputProps}
				style={[
					styles.input,
					(!noMargin && !button) && styles.bottomMargin,
					button && styles.inputWithAction,
					style,
					controlStyle,
				]}
				value={state.value}
				onChangeText={onChange}
				caption={!noCaption ? state.error : undefined}
				size={size ?? 'large'}
				keyboardType={keyboardTypes[type]}
				status={inputStatus}
				returnKeyType={isLast ? 'done' : 'next'}
				accessoryLeft={
					hasIcon
						? (props) => <Icon {...props} name={icons[type]} />
						: undefined
				}
				accessoryRight={
					type === 'password'
						? (props) => (
							<IconButton
								{...props}
								name={isSecret ? 'eye' : 'eye-off'}
								onPress={() => setIsSecret(prevIsSecret => !prevIsSecret)}
								autoSize
							/>
						)
						: undefined
				}
				secureTextEntry={type === 'password' && isSecret}
			/>
		);
	}

	if (button) return (
		<View
			style={[
				styles.actionAndInput,
				!noMargin && styles.bottomMargin,
			]}
		>
			{input}
			<FormButton
				{...button}
				style={[
					styles.action,
					button.style,
					Boolean(textInputProps.label) && styles.actionWithLabel,
					Boolean(!noCaption && (state.error || textInputProps.caption)) && styles.actionWithCaption,
				]}
				status={button.status ?? inputStatus}
				size={button.size ?? 'small'}
				borders={button.borders ?? 'curved'}
				hasBorder={button.hasBorder ?? true}
				disabled={
					textInputProps.disabled
					|| button.disabled
					|| textInputProps.disabled
				}
				noMargin
			/>
		</View>
	);

	return input;

};

export default forwardRef<Input, FormInputProps>(FormInput);
