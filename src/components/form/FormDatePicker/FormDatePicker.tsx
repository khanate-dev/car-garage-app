import { forwardRef, Ref } from 'react';
import { Datepicker, Icon } from '@ui-kitten/components';

import { getDateOrNull } from 'helpers/date';

import { FormDatePickerProps } from './FormDatePicker.types';
import styles from './FormDatePicker.styles';

const FormDatePicker = ({
	style,
	state,
	onChange,
	size,
	status,
	hasIcon,
	noCaption,
	noMargin,
	...datePickerProps
}: FormDatePickerProps, ref: Ref<Datepicker>) => (

	<Datepicker
		ref={ref}
		{...datePickerProps}
		date={getDateOrNull(state.value) ?? undefined}
		style={[
			styles.input,
			!noMargin && styles.bottomMargin,
			style,
		]}
		onSelect={(date) => onChange(date.toISOString())}
		boundingMonth={false}
		caption={!noCaption ? state.error : undefined}
		size={size ?? 'large'}
		status={state.error ? 'danger' : status}
		accessoryLeft={
			hasIcon
				? (props) => <Icon {...props} name='calendar-outline' />
				: undefined
		}
		accessoryRight={(props) =>
			<Icon
				{...props}
				name='calendar-outline'
			/>
		}
	/>

);

export default forwardRef<Datepicker, FormDatePickerProps>(FormDatePicker);
