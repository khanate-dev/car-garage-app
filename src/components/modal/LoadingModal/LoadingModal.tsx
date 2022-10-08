import { Modal, Spinner, useStyleSheet } from '@ui-kitten/components';

import loadingModalStyles from './LoadingModal.styles';

const LoadingModal = () => {

	const styles = useStyleSheet(loadingModalStyles);

	return (
		<Modal
			style={styles.modal}
			backdropStyle={styles.backdrop}
			focusable={false}
			visible
		>
			<Spinner
				status='control'
				size='giant'
			/>
		</Modal>
	);
};

export default LoadingModal;
