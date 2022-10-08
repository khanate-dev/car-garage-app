import { useRef } from 'react';
import { Keyboard, ScrollView, View } from 'react-native';
import { Datepicker, Input } from '@ui-kitten/components';

import { isSmallerScreen } from 'config/react';

import {
	getInvalidState,
	handleFormChange,
	handleFormFocusNext,
} from 'helpers/form';
import { humanizeString } from 'helpers/string';

import Alert from 'components/feedback/Alert';
import FormInput from 'components/form/FormInput';
import FormButton from 'components/form/FormButton';

import { FormFieldWithValues } from 'types/form';

import { FormContainerProps } from './FormContainer.types';
import styles from './FormContainer.styles';

const FormContainer = <Fields extends string>({
	style,
	form,
	setForm,
	formFields,
	status,
	setStatus,
	submitLabel,
	submitIcon,
	onSubmit,
	onInputChange,
	submitProps,
	hasIcons,
	isBusy,
	disabled,
}: FormContainerProps<Fields>) => {

	const formRefs = useRef<(null | Input | Datepicker)[]>([]);

	const checkSubmissionValidity = () => {

		Keyboard.dismiss();
		setStatus?.(null);

		const formFieldsWithValues: FormFieldWithValues[] = formFields.map(field => ({
			...field,
			value: form[field.name]?.value,
		}));

		const invalidState = getInvalidState(formFieldsWithValues);

		if (invalidState) {
			setForm(prevForm => ({
				...prevForm,
				...invalidState as any,
			}));
			return;
		}

		onSubmit();

	};

	return (
		<View
			style={[
				styles.container,
				style,
			]}
		>

			<ScrollView>
				{formFields.map((field, index) =>
					<FormInput
						{...field.inputProps}
						style={(index + 1) === formFields.length && styles.lastInput}
						ref={(element) => { formRefs.current[index] = element; }}
						key={field.name}
						type={field.type}
						state={form[field.name]}
						label={`${field.label ?? humanizeString(field.name)}${!field.canBeNull ? ' *' : ''}`}
						onChange={(value) => {
							handleFormChange(setForm, field.name, value);
							onInputChange?.(field, value);
						}}
						onSubmitEditing={() => handleFormFocusNext(formRefs, index)}
						hasIcon={hasIcons}
						button={field.button}
						disabled={
							isBusy
							|| (
								field.dependsOn
								&& !form[field.dependsOn].value
							)
						}
						blurOnSubmit={(index + 1) === formFields.length}
						isLast={(index + 1) === formFields.length}
					/>
				)}
			</ScrollView>

			{status &&
				<Alert
					state={status}
					hasIcon
				/>
			}

			<FormButton
				label={submitLabel ?? 'Submit'}
				onPress={checkSubmissionValidity}
				borders='curved'
				iconLeft={submitIcon ?? hasIcons ? 'flash-outline' : undefined}
				isLoading={isBusy}
				size={isSmallerScreen ? 'medium' : 'large'}
				disabled={disabled}
				{...submitProps}
			/>

		</View>
	);

};

export default FormContainer;
