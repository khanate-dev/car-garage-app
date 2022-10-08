import { View } from 'react-native';
import { Icon, Modal, Text, useTheme } from '@ui-kitten/components';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';

import { useSetAlert } from 'contexts/app-state';

import { themeColorIcons } from 'helpers/theme';

import FormButton from 'components/form/FormButton';

import { AlertModalProps } from './AlertModal.types';
import getAlertModalStyles from './AlertModal.styles';

const AlertModal = ({
	style,
	backdropStyle,
	title,
	text,
	type = 'basic',
	closeLabel,
	actions: passedActions,
	onClose,
	hasIcon,
}: AlertModalProps) => {

	const setAlert = useSetAlert();
	const theme = useTheme();
	const styles = getAlertModalStyles(theme, type, hasIcon);

	const actions: AlertModalProps['actions'] = [
		...(passedActions ?? []),
		{
			label: closeLabel ?? 'Close',
			onPress: onClose,
			status: type === 'basic' ? 'basic' : 'control',
		},
	];

	const handleClose = () => {
		setAlert(null);
		onClose?.();
	};

	return (
		<Modal
			style={[styles.modal, style]}
			backdropStyle={[styles.backdrop, backdropStyle]}
			onBackdropPress={handleClose}
			visible
		>

			<Animated.View
				style={styles.header}
				entering={SlideInLeft}
				exiting={SlideOutRight}
			>

				{hasIcon &&
					<View
						style={styles.iconContainer}
					>
						<Icon
							fill='#ffffff'
							name={themeColorIcons[type]}
						/>
					</View>
				}

				<Text
					style={styles.title}
					category='h6'
					numberOfLines={1}
				>
					{title}
				</Text>

			</Animated.View>

			<Animated.ScrollView
				contentContainerStyle={styles.body}
				entering={SlideInLeft}
				exiting={SlideOutRight}
			>
				<Text
					style={styles.text}
					category='s1'
				>
					{text}
				</Text>
			</Animated.ScrollView>

			<Animated.View
				style={styles.actions}
				entering={SlideInLeft}
				exiting={SlideOutRight}
			>
				{actions.map((action, index) =>
					<FormButton
						key={index}
						{...action}
						style={[
							styles.action,
							action.style,
							index > 0 && styles.notFirst,
						]}
						borders={action.borders ?? 'curved'}
						status={action.status ?? (type === 'basic' ? 'primary' : type)}
						appearance={action.appearance ?? 'filled'}
						size={action.size ?? 'medium'}
						onPress={(event) => {
							action.onPress?.(event);
							handleClose();
						}}
						noMargin
					/>
				)}
			</Animated.View>

		</Modal>
	);
};

export default AlertModal;
