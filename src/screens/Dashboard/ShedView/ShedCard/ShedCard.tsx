import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { Icon, Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Animated, {
	Layout,
	useAnimatedStyle,
	useSharedValue,
	FadeInUp,
	FadeOutUp,
} from 'react-native-reanimated';

import { isSmallerScreen } from 'config/react';
import { useCurrentPage } from 'contexts/dashboard';

import { getAgeFromDate } from 'helpers/time';
import { humanizeString } from 'helpers/string';
import { ShedModal, shedModals } from 'schemas/shed';
import { cleanOutSteps } from 'schemas/clean-out';

import ShedFormModal from 'screens/Dashboard/ShedFormModal';
import IconButton from 'components/form/IconButton';
import {
	AgeIcon,
	BirdIcon,
	FcrIcon,
	MortalityIcon,
	WeightIcon,
} from 'components/media/icons';

import { DashboardNavigation } from 'screens/Dashboard';

import { ShedCard as ShedCardType, ShedCardProps } from './ShedCard.types';
import shedCardStyles from './ShedCard.styles';

const cards: ShedCardType[] = [
	{
		name: 'age',
		icon: AgeIcon,
		showsUnexpended: true,
		getText: ({ flock }) => (
			flock
				? getAgeFromDate(flock.date).toFixed(0)
				: '-'
		),
	},
	{
		name: 'mortality',
		icon: MortalityIcon,
		getText: ({ mortality }) => (
			mortality
				? `${mortality.mortality.toFixed(1)}%`
				: '-'
		),
	},
	{
		name: 'fcr',
		label: 'FCR',
		icon: FcrIcon,
		getText: ({ fcr }) => (
			fcr
				? fcr.bags.toFixed(1)
				: '-'
		),
	},
	{
		name: 'noOfBirds',
		label: 'Birds Placed',
		isWider: true,
		icon: BirdIcon,
		showsUnexpended: true,
		getText: ({ weight = [] }) => (
			weight.length > 0
				? weight.reduce(
					(sum, { batchSize }) => sum + batchSize, 0
				).toLocaleString()
				: '-'
		),
	},
	{
		name: 'averageWeight',
		isWider: true,
		icon: WeightIcon,
		getText: ({ weight = [] }) => (
			weight.length > 0
				? `${weight.reduce(
					(sum, { batchWeight }) => sum + batchWeight, 0
				).toFixed(1).replace(/(\..)(.*)/g, '$1')}`
				: '-'
		),
	},
];

const normalWidth = '50%';
const normalHeight = isSmallerScreen ? 160 : 200;
const expandedWidth = '100%';
const expandedHeight = isSmallerScreen ? 240 : 300;
const sellingWidth = '100%';
const sellingHeight = isSmallerScreen ? 280 : 345;

const ShedCard = ({
	shed,
	gradient,
	onExpand,
	onShrink,
	isExpanded,
}: ShedCardProps) => {

	const theme = useTheme();
	const styles = useStyleSheet(shedCardStyles);
	const navigation = useNavigation<DashboardNavigation<'ShedView'>>();
	const { setCurrentPage } = useCurrentPage();

	const [openModal, setOpenModal] = useState<null | Exclude<ShedModal, 'weight'>>(null);

	const gradientProps: LinearGradientProps = {
		colors: gradient,
		start: { x: 0, y: 1 },
		end: { x: 1, y: 1 },
	};

	const step = (
		!shed.cleanOut || cleanOutSteps.some(step => !shed.cleanOut?.[step])
			? 'Cleaning'
			: 'Rearing'
	);

	const currentAction = (
		step === 'Rearing' && shed.flock
			? undefined
			: step === 'Rearing'
				? 'addFlock'
				: cleanOutSteps.find(key => !shed.cleanOut?.[key])

	);

	const currentCards: ShedCardType[] = (
		!currentAction
			? cards
			: [{
				name: 'action',
				getText: () => humanizeString(currentAction),
				icon: currentAction === 'addFlock' ? BirdIcon : undefined,
				isFull: true,
				showsUnexpended: true,
				noLabel: true,
			}]
	);

	const handlePress = () => {

		if (!currentAction) {
			onExpand();
			return;
		}

		setCurrentPage({
			name: currentAction,
			shed,
		});
		navigation.navigate('ShedForm');

	};

	const width = useSharedValue<string>(normalWidth);
	const height = useSharedValue<number>(normalHeight);
	const animatedStyles = useAnimatedStyle(() => ({
		width: width.value,
		height: height.value,
	}));

	useEffect(() => {
		const isSelling = isExpanded && shed.isSelling && shed.contracts;
		width.value = (
			isSelling
				? sellingWidth
				: isExpanded
					? expandedWidth
					: normalWidth
		);
		height.value = (
			isSelling
				? sellingHeight
				: isExpanded
					? expandedHeight
					: normalHeight
		);
	}, [isExpanded, shed.isSelling, shed.contracts]);

	return (
		<Animated.View
			style={[
				styles.shedOuterContainer,
				animatedStyles,
			]}
			layout={Layout.springify().stiffness(50)}
			entering={FadeInUp}
			exiting={FadeOutUp}
		>
			<TouchableOpacity
				key={shed.shedId}
				style={styles.shedTouchable}
				onPress={handlePress}
				disabled={isExpanded}
				activeOpacity={0.5}
			>
				<LinearGradient
					key={shed.shedId}
					style={styles.shedContainer}
					{...gradientProps}
				>

					<View
						style={styles.shedHeading}
					>

						<Text
							style={styles.shedHeadingText}
							category='h4'
						>
							{shed.name}
						</Text>

						{isExpanded &&
							<IconButton
								name='close-outline'
								onPress={onShrink}
								size={30}
								iconFill='#fff'
							/>
						}

					</View>

					<View style={styles.shedBody}>
						{currentCards.map(({
							name,
							label,
							getText,
							icon: Icon,
							showsUnexpended,
							isWider,
							isFull,
							noLabel,
						}) =>
							<Animated.View
								key={name}
								style={[
									styles.cardContainer,
									isWider && styles.wider,
									(!isExpanded && !showsUnexpended) && styles.hidden,
									(!isExpanded && showsUnexpended) && styles.unexpendedCard,
									isFull && styles.full,
								]}
								layout={Layout.springify().stiffness(50)}
							>
								<View
									key={name}
									style={[
										styles.card,
										(isExpanded) && styles.cardBigger,
									]}
								>

									{(Icon && currentAction) &&
										<Icon
											style={[
												styles.cardIcon,
												currentAction && styles.actionIcon,
											]}
										/>
									}

									<View
										style={styles.cardContent}
									>

										<Text
											style={[
												styles.cardValue,
												isExpanded && styles.cardValueBigger,
											]}
										>
											{getText(shed)}
										</Text>

										{!noLabel && isExpanded &&
											<Text
												style={[
													styles.cardLabel,
													(isExpanded) && styles.cardLabelBigger,
												]}
											>
												{label ?? humanizeString(name)}
											</Text>

										}

									</View>

									{(Icon && !currentAction) &&
										<Icon
											style={[
												styles.cardIcon,
												isExpanded && styles.cardIconBigger,
											]}
										/>
									}

								</View>
							</Animated.View>
						)}
					</View>

					<View style={styles.shedFooter}>

						{!isExpanded &&
							<Text style={styles.footerLabel}>
								{step}
							</Text>
						}
						{(!isExpanded && shed.isSelling && shed.contracts?.length) &&
							<View style={styles.footerSale}>
								<Icon
									name='shopping-cart'
									style={styles.footerSaleIcon}
									fill={theme['color-primary-600']}
								/>
								<Text style={styles.footerSaleText}>
									{shed.contracts.length}
								</Text>
							</View>
						}

						{isExpanded && shedModals.map((action, index) =>
							<TouchableOpacity
								key={action}
								style={[
									styles.footerAction,
									(index + 1) < shedModals.length && styles.notLast,
								]}
								onPress={() => {
									if (action === 'weight') {
										setCurrentPage({
											name: 'weightForm',
											shed,
										});
										navigation.navigate('WeightForm');
									}
									else setOpenModal(action);
								}}
								activeOpacity={0.5}
							>
								<LinearGradient
									style={[
										styles.footerActionGradient,
										shed[action] && styles.footerActionCompleted,
									]}
									colors={['transparent', '#eee']}
									start={{ x: 0, y: 0 }}
									end={{ x: 0, y: 1 }}
								>
									<Text style={styles.footerActionLabel}>
										{action === 'fcr'
											? 'FCR'
											: `${action[0]?.toUpperCase()}${action.slice(1)}`
										}
									</Text>
								</LinearGradient>
							</TouchableOpacity>
						)}

					</View>

					{(isExpanded && shed.isSelling && shed.contracts) &&
						<TouchableOpacity
							style={styles.saleButton}
							onPress={() => {
								setCurrentPage({
									name: 'bookSales',
									shed,
								});
								navigation.navigate('BookSales');
							}}
							activeOpacity={0.5}
						>
							<Text style={styles.saleButtonText}>
								5 Pending Sales Contracts
							</Text>
						</TouchableOpacity>
					}

					{openModal &&
						<ShedFormModal
							name={openModal}
							shed={shed}
							onClose={() => setOpenModal(null)}
						/>
					}

				</LinearGradient>
			</TouchableOpacity>
		</Animated.View>
	);

};

export default ShedCard;
